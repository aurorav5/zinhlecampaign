import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { getCombinedTotals, type CombinedTotals } from "@/lib/totals.functions";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(n);

type Props = { initial?: CombinedTotals };

export function HeroPlayCta({ initial }: Props) {
  const fetcher = useServerFn(getCombinedTotals);
  const { data } = useQuery({
    queryKey: ["totals", "combined"],
    queryFn: () => fetcher(),
    initialData: initial,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const combined = data?.combined ?? 0;
  const target = data?.target ?? 250000;
  const bab = data?.backabuddyRaised ?? 0;
  const eft = data?.eftVerified ?? 0;
  const pct = target > 0 ? Math.min(100, (combined / target) * 100) : 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="pointer-events-auto flex flex-col items-center gap-6">
        <Link
          to="/music"
          aria-label="Play the music — go to the Music page"
          className="group relative flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] shadow-glow-gold transition-transform hover:scale-105 active:scale-95 md:h-28 md:w-28"
        >
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[color:var(--gold)]/40"
          />
          <Play className="relative h-9 w-9 md:h-11 md:w-11" fill="currentColor" />
        </Link>

        <div className="w-[min(420px,86vw)] rounded-2xl border border-white/10 bg-[color:var(--ink)]/70 px-5 py-4 text-center backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--gold)]">
            Raised so far
          </p>
          <p className="mt-1 font-display text-3xl text-[color:var(--cream)] sm:text-4xl">
            {fmt(combined)}
          </p>
          <p className="mt-1 text-xs text-[color:var(--cream)]/65">
            of {fmt(target)} · {pct.toFixed(1)}%
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[color:var(--gold)] transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[color:var(--cream)]/55">
            {fmt(bab)} Back a Buddy · {fmt(eft)} verified EFT
          </p>
        </div>
      </div>
    </div>
  );
}
