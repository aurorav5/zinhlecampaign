import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { fetchBackabuddyStats } from "@/lib/backabuddy.functions";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type CombinedTotals = {
  backabuddyRaised: number;
  eftVerified: number;
  combined: number;
  target: number;
  fetchedAt: string;
};

export async function fetchCombinedTotals(): Promise<CombinedTotals> {
  const bab = await fetchBackabuddyStats().catch(() => null);
  let verified = 0;
  try {
    const supabase = publicClient();
    const { data } = await supabase
      .from("contributions")
      .select("amount_cents, verified");
    if (data) {
      for (const r of data) if (r.verified) verified += r.amount_cents;
    }
  } catch {
    /* ignore */
  }
  const backabuddyRaised = bab?.raised ?? 0;
  const eftVerified = Math.round(verified / 100);
  return {
    backabuddyRaised,
    eftVerified,
    combined: backabuddyRaised + eftVerified,
    target: bab?.target ?? 250000,
    fetchedAt: new Date().toISOString(),
  };
}

export const getCombinedTotals = createServerFn({ method: "GET" }).handler(
  async (): Promise<CombinedTotals> => fetchCombinedTotals(),
);
