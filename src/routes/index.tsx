import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Music2, Heart, Share2 } from "lucide-react";
import heroDuet from "@/assets/hero-duet.jpg";
import { Reveal } from "@/components/site/Reveal";
import { HeroVideoPlayer } from "@/components/site/HeroVideoPlayer";
import { HeroPlayCta } from "@/components/site/HeroPlayCta";
import { getBackabuddyStats } from "@/lib/backabuddy.functions";
import { fetchCombinedTotals } from "@/lib/totals.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "She Sang to a Tortoise — A true story from the Baviaanskloof" },
      {
        name: "description",
        content:
          "Phil Bölke found a 19-year-old singing alone on a dirt road in the Eastern Cape. This is the campaign to give her voice the footing it deserves.",
      },
      { property: "og:title", content: "She Sang to a Tortoise" },
      {
        property: "og:description",
        content:
          "A true story from the Baviaanskloof — and the campaign to give Zinhle financial independence as her debut album is produced.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroDuet },
      { name: "twitter:image", content: heroDuet },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    const [backabuddyStats, combinedTotals] = await Promise.all([
      getBackabuddyStats().catch(() => undefined),
      fetchCombinedTotals().catch(() => undefined),
    ]);
    return { backabuddyStats, combinedTotals };
  },
  component: HomePage,
});

function formatRand(n: number): string {
  return "R\u00a0" + n.toLocaleString("en-ZA");
}

function HomePage() {
  const { backabuddyStats, combinedTotals } = Route.useLoaderData();

  const raised = backabuddyStats?.raised ?? 0;
  const target = backabuddyStats?.target ?? 250000;
  const pct = target > 0 ? Math.round((raised / target) * 1000) / 10 : 0;

  const campaignSub =
    raised > 0
      ? `${formatRand(raised)} raised · ${pct}%`
      : `${formatRand(target)} target`;

  return (
    <div className="relative h-dvh min-h-[600px] w-full overflow-hidden">
      <HeroVideoPlayer videoId="mKPz5mcQ0rA" title="Who I Am" />
      <HeroPlayCta initial={combinedTotals} />

      {/* Background image */}
      <img
        src={heroDuet}
        alt="Phil Bölke and Zinhle at twin microphones in the studio"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />

      {/* Gradient overlay — heavy at top for logo/nav, heaviest at bottom for cards */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.18) 35%, rgba(8,8,10,0.42) 58%, rgba(4,19,50,0.93) 82%, rgba(4,14,40,0.98) 100%)",
        }}
      />

      {/* Main layout — flex column, title top-centre, cards pinned to bottom */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-6 pt-28 md:pb-8 md:pt-32">

        {/* Title block */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--gold)] sm:text-xs">
              ThatGuy Productions International
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-3xl leading-[1.08] text-[color:var(--cream)] sm:text-4xl md:text-5xl lg:text-6xl">
              She Sang to a Tortoise
              <span className="block text-[color:var(--cream)]/75">
                — And Didn't Know I Was There
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-3 text-sm text-[color:var(--cream)]/65 sm:text-base">
              A campaign to protect the independence of an extraordinary Eastern Cape voice.
            </p>
          </Reveal>
        </div>

        {/* Clickthrough card grid */}
        <Reveal delay={0.28}>
          <div className="mx-auto w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
              <NavCard
                to="/story"
                icon={<BookOpen className="h-5 w-5" />}
                label="The Story"
                sub="How it all started"
              />
              <NavCard
                to="/music"
                icon={<Music2 className="h-5 w-5" />}
                label="The Music"
                sub="2 videos · studio recording"
              />
              <NavCard
                to="/campaign"
                icon={<Heart className="h-5 w-5" />}
                label="The Campaign"
                sub={campaignSub}
                highlight
              />
              <NavCard
                to="/share"
                icon={<Share2 className="h-5 w-5" />}
                label="Share"
                sub="It costs nothing"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

type NavCardProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  highlight?: boolean;
};

function NavCard({ to, icon, label, sub, highlight = false }: NavCardProps) {
  return (
    <Link
      to={to}
      className={[
        "group flex flex-col gap-2 rounded-2xl border px-4 py-5 transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-glow-gold active:scale-[0.98]",
        "md:px-6 md:py-6",
        highlight
          ? "border-[color:var(--gold)]/55 bg-[color:var(--gold)]/12 hover:bg-[color:var(--gold)]/22"
          : "border-white/12 bg-[color:var(--ink)]/55 hover:border-[color:var(--gold)]/35 hover:bg-[color:var(--ink)]/75",
      ].join(" ")}
    >
      <span
        className={
          highlight
            ? "text-[color:var(--gold)]"
            : "text-[color:var(--gold)]/70 group-hover:text-[color:var(--gold)]"
        }
      >
        {icon}
      </span>
      <span className="font-display text-base text-[color:var(--cream)] sm:text-lg md:text-xl">
        {label}
      </span>
      <span className="text-[11px] leading-snug text-[color:var(--cream)]/50 sm:text-xs">
        {sub}
      </span>
    </Link>
  );
}
