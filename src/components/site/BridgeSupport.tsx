import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Info } from "lucide-react";
import bankingQr from "@/assets/banking-qr.png";
import { Reveal } from "@/components/site/Reveal";
import {
  getContributionTotals,
  listContributions,
  submitContribution,
} from "@/lib/contributions.functions";

const BANKING = [
  ["Bank", "Capitec"],
  ["Account Holder", "Mr Philippus Bölke"],
  ["Business Name", "Thatguy Productions International"],
  ["Account Number", "2558008516"],
  ["SWIFT / BIC", "CABLZAJJ"],
  ["Branch Code", "470010"],
] as const;

const ZAR0 = (cents: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(cents / 100);

const SHORT_DATE = new Intl.DateTimeFormat("en-ZA", {
  day: "numeric",
  month: "short",
});

type Tone = "dark" | "light";

export function BridgeSupport({ tone = "light" }: { tone?: Tone }) {
  const totalsFetcher = useServerFn(getContributionTotals);
  const listFetcher = useServerFn(listContributions);
  const submitFn = useServerFn(submitContribution);
  const qc = useQueryClient();

  const totals = useQuery({
    queryKey: ["contributions", "totals"],
    queryFn: () => totalsFetcher(),
    staleTime: 30_000,
  });
  const list = useQuery({
    queryKey: ["contributions", "list"],
    queryFn: () => listFetcher(),
    staleTime: 30_000,
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (vars: { name: string; amount: number; reference: string; message: string }) =>
      submitFn({ data: vars }),
    onSuccess: () => {
      toast.success("Thank you — your contribution has been recorded.");
      setName("");
      setAmount("");
      setReference("");
      setMessage("");
      setErrors({});
      qc.invalidateQueries({ queryKey: ["contributions"] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Could not record your contribution.");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    const trimmedName = name.trim();
    const amountNum = Number(amount);
    const trimmedRef = reference.trim();
    if (!trimmedName) next.name = "Required";
    else if (trimmedName.length > 80) next.name = "Too long";
    if (!amount || isNaN(amountNum) || amountNum <= 0) next.amount = "Enter an amount";
    else if (amountNum > 1_000_000) next.amount = "Too large";
    if (!trimmedRef) next.reference = "Required";
    else if (trimmedRef.length > 60) next.reference = "Too long";
    if (message.length > 500) next.message = "Max 500 characters";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    mutation.mutate({
      name: trimmedName,
      amount: amountNum,
      reference: trimmedRef,
      message: message.trim(),
    });
  };

  const totalsData = totals.data;
  const rows = list.data ?? [];

  const surface = tone === "dark"
    ? "bg-[color:var(--ink)]/60 border-[color:var(--amber-warm)]/35 text-[color:var(--cream)]"
    : "bg-[color:var(--cream)] border-[color:var(--ink)]/10 text-[color:var(--ink)]";
  const subtle = tone === "dark" ? "text-[color:var(--cream)]/70" : "text-[color:var(--ink)]/65";
  const labelMuted = tone === "dark" ? "text-[color:var(--cream)]/55" : "text-[color:var(--ink)]/55";
  const inputClass =
    tone === "dark"
      ? "w-full rounded-lg border border-[color:var(--cream)]/15 bg-[color:var(--ink)]/40 px-3 py-2.5 text-sm text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/35 focus:border-[color:var(--gold)] focus:outline-none"
      : "w-full rounded-lg border border-[color:var(--ink)]/15 bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] placeholder:text-[color:var(--ink)]/40 focus:border-[color:var(--gold)] focus:outline-none";

  return (
    <div className={`overflow-hidden rounded-2xl border p-6 sm:p-8 ${surface}`}>
      <Reveal>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--amber-warm)]">
          <Info className="h-4 w-4" /> Interim bridge support — directly to Phil Bölke
        </div>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl">Support right now, directly.</h2>
        <p className={`mt-3 text-sm sm:text-base ${subtle}`}>
          If you'd prefer to help immediately by bank transfer, send your EFT and log it
          below so it's recorded publicly. This is separate from the Back a Buddy joint-account
          campaign.
        </p>
      </Reveal>

      {/* Totals */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[color:var(--gold)]/25 p-4">
          <div className={`text-[10px] uppercase tracking-[0.24em] ${labelMuted}`}>Committed</div>
          <div className="mt-1 font-display text-2xl text-[color:var(--gold)] sm:text-3xl">
            {ZAR0(totalsData?.committed_cents ?? 0)}
          </div>
          <div className={`mt-1 text-[11px] ${subtle}`}>
            {totalsData?.count ?? 0} contribution{(totalsData?.count ?? 0) === 1 ? "" : "s"} logged
          </div>
        </div>
        <div className="rounded-xl border border-[color:var(--gold)]/25 p-4">
          <div className={`text-[10px] uppercase tracking-[0.24em] ${labelMuted}`}>Verified</div>
          <div className="mt-1 font-display text-2xl text-[color:var(--gold)] sm:text-3xl">
            {ZAR0(totalsData?.verified_cents ?? 0)}
          </div>
          <div className={`mt-1 text-[11px] ${subtle}`}>
            {totalsData?.verified_count ?? 0} confirmed against bank statement
          </div>
        </div>
      </div>

      {/* Banking details + QR */}
      <div className="mt-6 grid gap-6 rounded-xl border border-[color:var(--gold)]/15 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
        <dl className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6 sm:gap-y-2">
          {BANKING.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className={`uppercase tracking-wider text-[11px] ${labelMuted}`}>{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-lg bg-white p-2">
            <img src={bankingQr} alt="Capitec banking QR code" className="h-32 w-32 sm:h-36 sm:w-36" />
          </div>
          <p className={`text-[11px] ${labelMuted}`}>Scan to pay</p>
        </div>
      </div>

      {/* Submission form */}
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bs-name" className={`mb-1.5 block text-xs uppercase tracking-wider ${labelMuted}`}>
            Your name
          </label>
          <input
            id="bs-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            className={inputClass}
            placeholder="As you'd like to appear publicly"
            required
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bs-amount" className={`mb-1.5 block text-xs uppercase tracking-wider ${labelMuted}`}>
            Amount (ZAR)
          </label>
          <input
            id="bs-amount"
            type="number"
            inputMode="decimal"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            placeholder="e.g. 500"
            required
          />
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
        </div>
        <div>
          <label htmlFor="bs-ref" className={`mb-1.5 block text-xs uppercase tracking-wider ${labelMuted}`}>
            EFT reference
          </label>
          <input
            id="bs-ref"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            maxLength={60}
            className={inputClass}
            placeholder="The reference you used on the transfer"
            required
          />
          {errors.reference && <p className="mt-1 text-xs text-red-500">{errors.reference}</p>}
        </div>
        <div>
          <label htmlFor="bs-msg" className={`mb-1.5 block text-xs uppercase tracking-wider ${labelMuted}`}>
            Message (optional)
          </label>
          <input
            id="bs-msg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            className={inputClass}
            placeholder="A short note, if you'd like"
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-2.5 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutation.isPending ? "Recording…" : "Log my contribution"}
          </button>
          <p className={`mt-2 text-[11px] ${labelMuted}`}>
            Submissions appear immediately as "committed". Phil reconciles them against his
            bank statement and ticks them as "verified".
          </p>
        </div>
      </form>

      {/* Recent list */}
      {rows.length > 0 && (
        <div className="mt-8">
          <h3 className={`text-xs uppercase tracking-[0.24em] ${labelMuted}`}>Recent contributions</h3>
          <ul className="mt-3 divide-y divide-current/10">
            {rows.slice(0, 8).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {r.name}{" "}
                    {r.verified && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-[color:var(--gold)]/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[color:var(--gold)]">
                        Verified
                      </span>
                    )}
                  </div>
                  {r.message && <div className={`truncate text-xs ${subtle}`}>{r.message}</div>}
                </div>
                <div className="flex shrink-0 items-baseline gap-3">
                  <span className="font-display text-base text-[color:var(--gold)]">
                    {ZAR0(r.amount_cents)}
                  </span>
                  <span className={`text-[11px] ${labelMuted}`}>
                    {SHORT_DATE.format(new Date(r.created_at))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
