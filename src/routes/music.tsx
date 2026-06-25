import { createFileRoute } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import foreverYouAsset from "@/assets/forever-you-zinhle.mp3.asset.json";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Blue Tick & Who I Am · Phil Bölke / Zinhle" },
      {
        name: "description",
        content:
          "Blue Tick (Phil Bölke ft. Zinhle) and Who I Am (Zinhle) — recorded in the Baviaanskloof at ThatGuy Productions International.",
      },
      { property: "og:title", content: "Music — Phil Bölke & Zinhle · ThatGuy Productions" },
      {
        property: "og:description",
        content:
          "Two tracks from the Baviaanskloof. Blue Tick and Who I Am — recorded at ThatGuy Productions International.",
      },
      { property: "og:url", content: "/music" },
    ],
    links: [{ rel: "canonical", href: "/music" }],
  }),
  component: MusicPage,
});

const MUSIC_JSON_LD = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": "Blue Tick",
    "byArtist": [
      { "@type": "MusicGroup", "name": "Phil Bölke" },
      { "@type": "Person", "name": "Zinhle" }
    ],
    "producer": { "@type": "Person", "name": "Phil Bölke" },
    "recordLabel": { "@type": "Organization", "name": "ThatGuy Productions International" },
    "url": "https://www.youtube.com/watch?v=nrwV-a9cS3Y",
    "description": "Recorded in the Baviaanskloof, Eastern Cape."
  },
  {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": "Who I Am",
    "byArtist": { "@type": "Person", "name": "Zinhle" },
    "producer": { "@type": "Person", "name": "Phil Bölke" },
    "recordLabel": { "@type": "Organization", "name": "ThatGuy Productions International" },
    "url": "https://www.youtube.com/watch?v=mKPz5mcQ0rA",
    "description": "Recorded in the Baviaanskloof, Eastern Cape."
  },
  {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": "Forever You",
    "byArtist": { "@type": "Person", "name": "Zinhle" },
    "producer": { "@type": "Person", "name": "Phil Bölke" },
    "recordLabel": { "@type": "Organization", "name": "ThatGuy Productions International" },
    "audio": "https://zinhlecampaign.lovable.app" + ${JSON.stringify(foreverYouAsset.url)},
    "description": "Studio recording from the Baviaanskloof sessions."
  }
]);

function MusicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: MUSIC_JSON_LD }} />
      <section className="bg-night px-5 pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">Now Streaming</p>
            <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl md:text-6xl">
              Blue Tick — Phil Bölke ft. Zinhle
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-[color:var(--cream)]/80 sm:text-lg">
              This is <em>Blue Tick</em> — Phil Bölke ft. Zinhle. It was recorded in the Baviaanskloof.
              She didn't know what she had. Now you can.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 aspect-video w-full overflow-hidden rounded-xl border border-[color:var(--gold)]/25 shadow-glow-gold">
              <iframe
                src="https://www.youtube.com/embed/nrwV-a9cS3Y"
                title="Blue Tick — Phil Bölke ft. Zinhle"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                {...({ fetchPriority: "high" } as any)}
                loading="eager"
                className="h-full w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href="https://youtu.be/nrwV-a9cS3Y"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
            >
              <Youtube className="h-4 w-4" /> Watch on YouTube
            </a>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-10 text-sm text-[color:var(--cream)]/60">
              Blue Tick · Phil Bölke ft. Zinhle · Produced, mixed and mastered at ThatGuy Productions International.
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mx-auto mt-24 border-t border-[color:var(--gold)]/20 pt-20">
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">Also on this page</p>
              <h2 className="mt-4 font-display text-3xl text-[color:var(--cream)] sm:text-4xl">
                Who I Am — Zinhle
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[color:var(--cream)]/80 sm:text-lg">
                A second recording from the Baviaanskloof sessions. Produced at ThatGuy Productions International.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mx-auto mt-10 aspect-video w-full overflow-hidden rounded-xl border border-[color:var(--gold)]/25 shadow-glow-gold">
              <iframe
                src="https://www.youtube.com/embed/mKPz5mcQ0rA"
                title="Who I Am — Zinhle"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <a
              href="https://youtu.be/mKPz5mcQ0rA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
            >
              <Youtube className="h-4 w-4" /> Watch on YouTube
            </a>
          </Reveal>

          <Reveal delay={0.6}>
            <p className="mt-10 text-sm text-[color:var(--cream)]/60">
              Who I Am · Zinhle · Produced, mixed and mastered at ThatGuy Productions International.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
