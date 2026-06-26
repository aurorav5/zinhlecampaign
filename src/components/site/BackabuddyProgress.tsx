import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ProgressBar } from "./ProgressBar";
import { getCombinedFundingStats, type CombinedFundingStats } from "@/lib/funding-totals.functions";

const FALLBACK_TARGET = 250000;

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (!isFinite(ms) || ms < 0) return "just now";
  const min = Math.floor(ms / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} d ago`;
}

type Props = { tone?: "dark" | "light"; initialStats?: CombinedFundingStats };

export function BackabuddyProgress({ tone = "dark", initialStats }: Props) {
  const fetcher = useServerFn(getCombinedFundingStats);
  const { data, isLoading } = useQuery({
    queryKey: ["funding", "combined"],
    queryFn: () => fetcher(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    initialData: initialStats,
  });

  const raised = data?.totalRaised ?? initialStats?.totalRaised ?? 0;
  const target = data?.target ?? initialStats?.target ?? FALLBACK_TARGET;
  const stats = data ?? initialStats;

  const subtleClass =
    tone === "light"
      ? "text-[color:var(--ink)]/55"
      : "text-[color:var(--cream)]/55";

  return (
    <div>
      <ProgressBar raised={raised} target={target} />
      <p className={`mt-2 text-xs ${subtleClass}`}>
        {stats
          ? <>
              Back a Buddy + verified EFT
              {stats.babDonors > 0 ? ` · ${stats.babDonors} BAB supporter${stats.babDonors === 1 ? "" : "s"}` : ""}
              {" · "}updated {relativeTime(stats.fetchedAt)}
              {stats.source === "fallback" ? " (cached)" : ""}
            </>
          : isLoading
            ? "Fetching live total…"
            : "Could not reach Back a Buddy — showing last known value."}
      </p>
    </div>
  );
}
