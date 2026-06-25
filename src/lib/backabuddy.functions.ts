import { createServerFn } from "@tanstack/react-start";

const CAMPAIGN_URL =
  "https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise";
const CACHE_KEY = "backabuddy:she-sang-to-a-tortoise";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export type BackabuddyStats = {
  raised: number;
  target: number;
  donors: number;
  fetchedAt: string;
  source: "live" | "cache" | "fallback";
};

const FALLBACK: BackabuddyStats = {
  raised: 5000,
  target: 250000,
  donors: 0,
  fetchedAt: new Date(0).toISOString(),
  source: "fallback",
};

function parsePreloadedState(html: string): { raised: number; target: number; donors: number } | null {
  // Extract window.__PRELOADED_STATE__ JSON blob
  const marker = "window.__PRELOADED_STATE__ = ";
  const start = html.indexOf(marker);
  if (start === -1) return null;
  // Find balanced JSON by counting braces from the first `{`
  const jsonStart = html.indexOf("{", start);
  if (jsonStart === -1) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = -1;
  for (let i = jsonStart; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === "\\") esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end === -1) return null;
  try {
    const state = JSON.parse(html.slice(jsonStart, end));
    const details =
      state?.campaignPublicDetailsReducers?.campaignPublicDetails ?? {};
    const target = Number(details?.donationTarget) || 0;
    const received = Number(details?.donationsReceivedTotal) || 0;
    const offline = Number(details?.offlineDonations) || 0;
    const donors = Number(details?.uniqueDonors) || 0;
    const raised = received + offline;
    if (target > 0) return { raised, target, donors };
  } catch {
    /* fall through */
  }
  return null;
}

function parseDom(html: string): { raised: number; target: number; donors: number } | null {
  const raisedMatch = html.match(/amount-raised[^>]*>\s*R\s*([0-9 ,.]+)</i);
  const targetMatch = html.match(/R\s*([0-9 ,.]+)\s*(?:goal|target)/i);
  const toNum = (s: string) =>
    Number(s.replace(/[^\d.]/g, "")) || 0;
  if (raisedMatch && targetMatch) {
    return {
      raised: toNum(raisedMatch[1]),
      target: toNum(targetMatch[1]),
      donors: 0,
    };
  }
  return null;
}

async function readCache(): Promise<BackabuddyStats | null> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("cache_kv")
      .select("value, expires_at")
      .eq("key", CACHE_KEY)
      .maybeSingle();
    if (!data) return null;
    const value = data.value as BackabuddyStats;
    const fresh = new Date(data.expires_at).getTime() > Date.now();
    return fresh ? { ...value, source: "cache" } : { ...value, source: "fallback" };
  } catch {
    return null;
  }
}

async function writeCache(stats: BackabuddyStats): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("cache_kv").upsert({
      key: CACHE_KEY,
      value: stats as unknown as never,
      expires_at: new Date(Date.now() + CACHE_TTL_MS).toISOString(),
    });
  } catch {
    /* ignore cache write failures */
  }
}

export async function fetchBackabuddyStats(): Promise<BackabuddyStats> {
  // 1. Serve fresh cache if available
  const cached = await readCache();
  if (cached && cached.source === "cache") return cached;

  // 2. Try a fresh scrape
  try {
    const res = await fetch(CAMPAIGN_URL, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; ZinhleCampaignBot/1.0; +https://zinhlecampaign.lovable.app)",
        accept: "text/html",
      },
    });
    if (res.ok) {
      const html = await res.text();
      const parsed = parsePreloadedState(html) ?? parseDom(html);
      if (parsed && parsed.target > 0) {
        const stats: BackabuddyStats = {
          ...parsed,
          fetchedAt: new Date().toISOString(),
          source: "live",
        };
        await writeCache(stats);
        return stats;
      }
    }
  } catch {
    /* fall through to stale cache or fallback */
  }

  // 3. Fall back to stale cache, then hard fallback
  if (cached) return cached;
  return FALLBACK;
}

export const getBackabuddyStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<BackabuddyStats> => fetchBackabuddyStats(),
);
