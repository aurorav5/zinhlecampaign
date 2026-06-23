type Props = {
  raised: number;
  target?: number;
  currency?: string;
};

const fmt = (n: number, currency = "ZAR") =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export function ProgressBar({ raised, target, currency = "ZAR" }: Props) {
  // Open campaign — no meaningful target (BAB sets R1 as placeholder)
  const hasTarget = target && target > 100;
  const pct = hasTarget ? Math.max(0, Math.min(100, (raised / target) * 100)) : null;

  return (
    <div>
      <div className="flex items-baseline justify-between text-sm text-[color:var(--cream)]/75">
        <span>
          <span className="font-display text-2xl text-[color:var(--gold)]">{fmt(raised, currency)}</span>{" "}
          raised
        </span>
        {hasTarget && <span>of {fmt(target, currency)}</span>}
      </div>
      {hasTarget && (
        <>
          <div
            className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[color:var(--cream)]/10"
            role="progressbar"
            aria-valuenow={raised}
            aria-valuemin={0}
            aria-valuemax={target}
            aria-label={`Campaign progress: ${fmt(raised, currency)} of ${fmt(target, currency)}`}
          >
            <div
              className="h-full rounded-full bg-[color:var(--gold)] shadow-glow-gold transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-[color:var(--cream)]/55">{pct?.toFixed(0)}% funded</div>
        </>
      )}
      {!hasTarget && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[color:var(--cream)]/10">
          <div className="h-full w-full animate-pulse rounded-full bg-[color:var(--gold)]/40" />
        </div>
      )}
    </div>
  );
}
