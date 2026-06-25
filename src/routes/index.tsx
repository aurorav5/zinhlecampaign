import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ArrowRight } from "lucide-react";
import heroDuet from "@/assets/hero-duet.jpg";
import { Reveal } from "@/components/site/Reveal";
import { BackabuddyProgress } from "@/components/site/BackabuddyProgress";
import { BridgeSupport } from "@/components/site/BridgeSupport";
import { ShareButtons } from "@/components/site/ShareButtons";

import { getBackabuddyStats } from "@/lib/backabuddy.functions";

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
    try {
      return { backabuddyStats: await getBackabuddyStats() };
    } catch {
      return { backabuddyStats: undefined };
    }
  },
  component: HomePage,
});

function HomePage() {
  const { backabuddyStats } = Route.useLoaderData();
  return (
    <>
      {/* HERO */}
      <section className="relative h-dvh min-h-[640px] w-full overflow-hidden">
        <img
          src={heroDuet}
          alt="Phil Bölke and Zinhle at twin microphones in the studio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.05) 28%, rgba(8,8,10,0.15) 55%, rgba(4,29,63,0.85) 88%, var(--ink) 100%)",
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-24 text-center md:pb-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">
              ThatGuy Productions International
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] text-[color:var(--cream)] sm:text-5xl md:text-6xl lg:text-7xl">
              She Sang to a Tortoise
              <span className="block text-[color:var(--cream)]/80">— And Didn't Know I Was There</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base text-[color:var(--cream)]/80 sm:text-lg">
              A true story from the Baviaanskloof, Eastern Cape.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <a
              href="#story"
              className="mt-12 inline-flex flex-col items-center gap-2 text-[color:var(--gold)] hover:opacity-80"
              aria-label="Scroll to story"
            >
              <span className="text-xs uppercase tracking-[0.3em]">Read on</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* STORY TEASER */}
      <section id="story" className="bg-[color:var(--offwhite)] px-5 py-24 md:py-32 text-[color:var(--ink)]">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Story</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
              There's a dirt road in the Baviaanskloof.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-body text-lg leading-relaxed text-[color:var(--ink)]/85">
              There's a dirt road in the Baviaanskloof, Eastern Cape, that most people will never drive.
              It cuts through one of the most remote, most beautiful valleys in South Africa — a place
              where the mountain meets the sky and time moves differently.
            </p>
            <p className="mt-6 font-body text-lg leading-relaxed text-[color:var(--ink)]/85">
              I was driving home on that road when I found a massive old tortoise planted square in the
              middle of it. I stopped, got out, and moved it. And then I heard her — a young woman, walking
              the road, singing to herself. Not performing. Just singing the way you only do when you are
              completely alone and completely free.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/story"
              className="mt-10 inline-flex items-center gap-2 font-display text-lg text-[color:var(--ink)] gold-underline hover:text-[color:var(--ink)]"
            >
              Read the full story <ArrowRight className="h-5 w-5 text-[color:var(--gold)]" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* MUSIC TEASER */}
      <section className="bg-night px-5 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Music</p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--cream)] sm:text-4xl md:text-5xl">
              Her voice stopped everyone who heard it.
            </h2>
            <p className="mt-6 max-w-md text-[color:var(--cream)]/80">
              Blue Tick — recorded in the Baviaanskloof, with Zinhle on vocals. Her own mother heard it for
              the first time on Father's Day and couldn't hold herself together.
            </p>
            <Link
              to="/music"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
            >
              Listen now <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-[color:var(--gold)]/20 shadow-glow-gold">
              <iframe
                src="https://www.youtube.com/embed/nrwV-a9cS3Y"
                title="Blue Tick — Phil Bölke ft. Zinhle"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGN TEASER */}
      <section className="px-5 py-24 md:py-32" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--ink)]/60 p-8 md:p-12">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Campaign</p>
            <h2 className="mt-4 font-display text-3xl text-[color:var(--cream)] sm:text-4xl">
              Twelve months of genuine independence.
            </h2>
            <p className="mt-6 text-[color:var(--cream)]/80">
              R250,000, ring-fenced in a joint-signatory account, going directly to Zinhle — travel, living
              costs, and a marketing fund for when her debut album is ready. Nothing to ThatGuy Productions.
              Phil carries the studio side himself.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <BackabuddyProgress tone="dark" initialStats={backabuddyStats} />
              <p className="mt-3 text-xs text-[color:var(--cream)]/55">
                Tracker reflects Back a Buddy contributions only.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/campaign"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold hover:-translate-y-0.5 transition-transform"
            >
              Support the campaign <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* BRIDGE / INTERIM SUPPORT */}
      <section className="border-t border-[color:var(--gold)]/20 bg-[color:var(--offwhite)] px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <BridgeSupport tone="light" />
        </div>
      </section>

      {/* SHARE */}
      <section className="px-5 pb-24 pt-4">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl text-[color:var(--cream)] sm:text-3xl">
              The right person seeing this costs nothing.
            </h2>
            <p className="mt-3 text-sm text-[color:var(--cream)]/70">Share it.</p>
            <div className="mt-6 flex justify-center">
              <ShareButtons />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
