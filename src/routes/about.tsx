import { createFileRoute } from "@tanstack/react-router";
import { Youtube, Facebook } from "lucide-react";
import brandBanner from "@/assets/brand-banner.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ThatGuy Productions International" },
      {
        name: "description",
        content:
          "Phil Bölke is an engineer, audio producer, and founder of ThatGuy Productions International, based in the Baviaanskloof, Eastern Cape.",
      },
      { property: "og:title", content: "About — ThatGuy Productions International" },
      {
        property: "og:description",
        content:
          "Phil Bölke — engineer, producer, founder. Sixteen years mastering audio. Doing this anyway.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="pt-20">
        <Reveal>
          <img
            src={brandBanner}
            alt="ThatGuy Productions International"
            className="w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="bg-night px-5 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">About</p>
            <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl">
              Phil Bölke
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-[color:var(--cream)]/85">
              Phil Bölke is an engineer, audio producer, and founder of ThatGuy Productions International
              and Arcovel Technologies International, based in the Baviaanskloof, Eastern Cape. He has
              spent sixteen years mastering audio professionally. He is currently working toward a PCT
              international patent filing deadline of December 2026.{" "}
              <span className="text-[color:var(--amber-warm)]">He is doing this anyway.</span>
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://youtu.be/nrwV-a9cS3Y"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Youtube className="h-4 w-4" /> YouTube
              </a>
              <a
                href="https://www.facebook.com/ThatGuyOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
