import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  amIAdmin,
  listContributions,
  setContributionVerified,
} from "@/lib/contributions.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Zinhle Campaign" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const ZAR0 = (cents: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(cents / 100);

function AdminPage() {
  const adminCheck = useServerFn(amIAdmin);
  const listFn = useServerFn(listContributions);
  const setVerifiedFn = useServerFn(setContributionVerified);
  const qc = useQueryClient();

  const me = useQuery({ queryKey: ["admin", "me"], queryFn: () => adminCheck() });
  const list = useQuery({ queryKey: ["contributions", "list"], queryFn: () => listFn() });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; verified: boolean }) => setVerifiedFn({ data: vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contributions"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  if (me.isLoading) {
    return <div className="bg-night min-h-dvh px-5 pt-32 text-[color:var(--cream)]/65">Loading…</div>;
  }

  if (!me.data?.isAdmin) {
    return (
      <div className="bg-night min-h-dvh px-5 pt-32 pb-24">
        <div className="mx-auto max-w-xl text-[color:var(--cream)]">
          <h1 className="font-display text-3xl">Not an admin yet</h1>
          <p className="mt-3 text-sm text-[color:var(--cream)]/70">
            You're signed in, but your account hasn't been granted the <code>admin</code> role.
            Run this SQL in Lovable Cloud → Database to grant yourself access:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-[color:var(--cream)]/15 bg-[color:var(--ink)]/60 p-4 text-xs">
{`INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'YOUR_EMAIL@example.com'
ON CONFLICT DO NOTHING;`}
          </pre>
          <button onClick={signOut} className="mt-6 text-xs underline">Sign out</button>
        </div>
      </div>
    );
  }

  const rows = list.data ?? [];

  return (
    <div className="bg-night min-h-dvh px-5 pt-32 pb-24">
      <div className="mx-auto max-w-3xl text-[color:var(--cream)]">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-3xl">Contributions admin</h1>
          <button onClick={signOut} className="text-xs text-[color:var(--cream)]/60 underline">
            Sign out
          </button>
        </div>
        <p className="mt-2 text-sm text-[color:var(--cream)]/65">
          Tick a row once you've matched it against your Capitec statement.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-[color:var(--cream)]/10">
          <table className="w-full text-sm">
            <thead className="bg-[color:var(--ink)]/60 text-left text-xs uppercase tracking-wider text-[color:var(--cream)]/55">
              <tr>
                <th className="px-3 py-2">Name / Ref</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">When</th>
                <th className="px-3 py-2">Verified</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-6 text-center text-[color:var(--cream)]/55">No contributions yet.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[color:var(--cream)]/10">
                  <td className="px-3 py-2.5">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-[color:var(--cream)]/55">Ref: {r.reference}</div>
                    {r.message && <div className="mt-0.5 text-xs italic text-[color:var(--cream)]/55">"{r.message}"</div>}
                  </td>
                  <td className="px-3 py-2.5 font-display text-[color:var(--gold)]">{ZAR0(r.amount_cents)}</td>
                  <td className="px-3 py-2.5 text-xs text-[color:var(--cream)]/65">
                    {new Date(r.created_at).toLocaleString("en-ZA")}
                  </td>
                  <td className="px-3 py-2.5">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={r.verified}
                        disabled={mutation.isPending}
                        onChange={(e) => mutation.mutate({ id: r.id, verified: e.target.checked })}
                      />
                      <span className="text-xs">{r.verified ? "Verified" : "Mark verified"}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
