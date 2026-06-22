import { createFileRoute } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Blue Tick · Phil Bölke ft. Zinhle" },
      {
        name: "description",
        content:
          "Blue Tick — Phil Bölke featuring Zinhle. Recorded in the Baviaanskloof at ThatGuy Productions International.",
      },
      { property: "og:title", content: "Blue Tick — Phil Bölke ft. Zinhle" },
      {
        property: "og:description",
        content:
          "Recorded in the Baviaanskloof. She didn't know what she had. Now you can.",
      },
      { property: "og:url", content: "/music" },
    ],
    links: [{ rel: "canonical", href: "/music" }],
  }),
  component: MusicPage,
});

function MusicPage() {
  return (
    <section className="bg-night px-5 pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Music</p>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl md:text-6xl">
            Listen first.
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
      </div>
    </section>
  );
}
