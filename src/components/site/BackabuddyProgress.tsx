import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ProgressBar } from "./ProgressBar";
import { getBackabuddyStats } from "@/lib/backabuddy.functions";

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

type Props = { tone?: "dark" | "light" };

export function BackabuddyProgress({ tone = "dark" }: Props) {
  const fetcher = useServerFn(getBackabuddyStats);
  const { data, isLoading } = useQuery({
    queryKey: ["backabuddy", "stats"],
    queryFn: () => fetcher(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const raised = data?.raised ?? 0;
  const target = data?.target ?? FALLBACK_TARGET;

  const subtleClass =
    tone === "light"
      ? "text-[color:var(--ink)]/55"
      : "text-[color:var(--cream)]/55";

  return (
    <div>
      <ProgressBar raised={raised} target={target} />
      <p className={`mt-2 text-xs ${subtleClass}`}>
        {isLoading
          ? "Fetching live total from Back a Buddy…"
          : data
            ? <>
                Live from Back a Buddy
                {data.donors > 0 ? ` · ${data.donors} supporter${data.donors === 1 ? "" : "s"}` : ""}
                {" · "}updated {relativeTime(data.fetchedAt)}
                {data.source === "fallback" ? " (cached)" : ""}
              </>
            : "Could not reach Back a Buddy — showing last known value."}
      </p>
    </div>
  );
}
