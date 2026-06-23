import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type ContributionRow = {
  id: string;
  name: string;
  amount_cents: number;
  reference: string;
  message: string | null;
  verified: boolean;
  created_at: string;
};

export type ContributionTotals = {
  committed_cents: number;
  verified_cents: number;
  count: number;
  verified_count: number;
};

const submitSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  amount: z.number().positive("Amount must be greater than zero").max(1_000_000),
  reference: z.string().trim().min(1, "Reference is required").max(60),
  message: z.string().trim().max(500).optional().or(z.literal("")),
});

export const submitContribution = createServerFn({ method: "POST" })
  .inputValidator((input) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: row, error } = await supabase
      .from("contributions")
      .insert({
        name: data.name.trim(),
        amount_cents: Math.round(data.amount * 100),
        reference: data.reference.trim(),
        message: data.message ? data.message.trim() : null,
      })
      .select("id, created_at")
      .single();
    if (error) {
      console.error("[contributions] insert failed", error);
      throw new Error("Could not record your contribution. Please try again.");
    }
    return row;
  });

export const listContributions = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContributionRow[]> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("contributions")
      .select("id, name, amount_cents, reference, message, verified, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) {
      console.error("[contributions] list failed", error);
      return [];
    }
    return data ?? [];
  },
);

export const getContributionTotals = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContributionTotals> => {
    const supabase = publicClient();
    const { data, error } = await supabase
      .from("contributions")
      .select("amount_cents, verified");
    if (error || !data) {
      return { committed_cents: 0, verified_cents: 0, count: 0, verified_count: 0 };
    }
    let committed = 0;
    let verified = 0;
    let verifiedCount = 0;
    for (const r of data) {
      committed += r.amount_cents;
      if (r.verified) {
        verified += r.amount_cents;
        verifiedCount++;
      }
    }
    return {
      committed_cents: committed,
      verified_cents: verified,
      count: data.length,
      verified_count: verifiedCount,
    };
  },
);

const verifySchema = z.object({
  id: z.string().uuid(),
  verified: z.boolean(),
});

export const setContributionVerified = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => verifySchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr || !isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("contributions")
      .update({
        verified: data.verified,
        verified_at: data.verified ? new Date().toISOString() : null,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const amIAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });
