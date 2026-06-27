import { createFileRoute } from "@tanstack/react-router";
import { Download, Mail, Music, Mic2, Film, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const EPK_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Zinhle",
  "description": "Emerging South African vocalist from the Baviaanskloof, Eastern Cape. Debut single Blue Tick produced by Phil Bölke at ThatGuy Productions International.",
  "genre": ["Afrikaans", "Pop", "Acoustic"],
  "affiliation": {
    "@type": "Organization",
    "name": "ThatGuy Productions International"
  },
  "sameAs": ["https://www.youtube.com/watch?v=nrwV-a9cS3Y", "https://www.youtube.com/watch?v=mKPz5mcQ0rA"]
});

export const Route = createFileRoute("/epk")({
  head: () => ({
    meta: [
      { title: "Electronic Press Kit — Zinhle · ThatGuy Productions" },
      {
        name: "description",
        content:
          "Press kit for Zinhle — emerging vocalist from the Baviaanskloof, Eastern Cape. Bio, tracks Blue Tick and Who I Am, production credits, and media contacts.",
      },
      { property: "og:title", content: "EPK — Zinhle · ThatGuy Productions International" },
      {
        property: "og:description",
        content:
          "Press materials for Zinhle. Tracks Blue Tick and Who I Am. Produced by Phil Bölke at ThatGuy Productions International, Baviaanskloof.",
      },
      { property: "og:url", content: "https://zinhlecampaign.lovable.app/epk" },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "canonical", href: "https://zinhlecampaign.lovable.app/epk" }],
  }),
  component: EpkPage,
});

const PRESS_DOCS = [
  {
    title: "Commitment Letter",
    description: "Phil Bölke's signed public commitment to Zinhle's development, published in full.",
    href: "/assets/Commitment_Letter_Zinhle_ThatGuy_signed.docx",
    filename: "Commitment_Letter_Zinhle_ThatGuy_signed.docx",
  },
  {
    title: "Artist Development Agreement",
    description: "Signed bilateral agreement governing the full development period.",
    href: "/assets/Artist_Development_Agreement_Zinhle_ThatGuy_signed.docx",
    filename: "Artist_Development_Agreement_Zinhle_ThatGuy_signed.docx",
  },
];

const TRACKS = [
  {
    title: "Blue Tick",
    sub: "Phil Bölke ft. Zinhle",
    embed: "https://www.youtube.com/embed/nrwV-a9cS3Y",
    watch: "https://youtu.be/nrwV-a9cS3Y",
    credits: [
      ["Label", "ThatGuy Productions International"],
      ["Distribution", "RouteNote"],
      ["Producer / Mix / Master", "Phil Bölke"],
      ["Recording location", "Baviaanskloof, Eastern Cape, SA"],
      ["ISRC Prefix", "ZA-3HH"],
      ["Genre", "Afrikaans Pop / Acoustic"],
    ] as const,
  },
  {
    title: "Who I Am",
    sub: "Zinhle",
    embed: "https://www.youtube.com/embed/mKPz5mcQ0rA",
    watch: "https://youtu.be/mKPz5mcQ0rA",
    credits: [
      ["Label", "ThatGuy Productions International"],
      ["Distribution", "RouteNote"],
      ["Producer / Mix / Master", "Phil Bölke"],
      ["Recording location", "Baviaanskloof, Eastern Cape, SA"],
      ["ISRC Prefix", "ZA-3HH"],
      ["Genre", "Afrikaans Pop / Soul"],
    ] as const,
  },
];

function EpkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: EPK_JSON_LD }} />
      <div className="bg-[color:var(--offwhite)] text-[color:var(--ink)]">

        <section className="bg-night px-5 pt-32 pb-20 md:pt-40">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">Electronic Press Kit</p>
              <h1 className="mt-4 font-display text-5xl text-[color:var(--cream)] sm:text-6xl md:text-7xl">
                Zinhle
              </h1>
              <p className="mt-4 font-display text-xl text-[color:var(--cream)]/70">
                Emerging Vocalist · Baviaanskloof, Eastern Cape, South Africa
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--cream)]/80">
                For media inquiries, sync licensing, and booking. All materials on this page are approved for press use.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 bg-[color:var(--offwhite)]">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <Mic2 className="h-5 w-5 text-[color:var(--gold)]" />
                <h2 className="font-display text-2xl text-[color:var(--ink)]">Artist Biography</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-[color:var(--ink)]/85">
                <p>
                  Zinhle grew up on a working farm in the Baviaanskloof — one of the most remote valleys in South Africa, where the Kouga mountains meet the Eastern Cape sky and the nearest town is an hour's drive on a dirt road. She had no vocal training, no music industry access, and no reason to believe that singing alone on a dirt road in the middle of nowhere was anything other than something she did for herself.
                </p>
                <p>
                  In 2025, Phil Bölke — mechanical engineer, quantum researcher, and founder of ThatGuy Productions International — encountered her by chance on exactly that road. She was 19 years old and didn't know he could hear her.
                </p>
                <p>
                  She is now recording her debut album at ThatGuy Productions International, a fully equipped professional studio built into the Baviaanskloof itself. Her debut single, <em>Blue Tick</em>, and a second recording, <em>Who I Am</em>, were produced, mixed, and mastered by Phil Bölke. They are the first recorded documents of a voice that stopped everyone who heard it cold.
                </p>
                <p>
                  At 19, Zinhle brings a tonal quality and emotional directness that is not taught. What she brings to the studio is what she brought to that dirt road: complete, unself-conscious truth.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <figure className="mt-10 rounded-2xl border-l-4 border-[color:var(--gold)] bg-white p-7 md:p-9">
                <blockquote className="font-display text-xl leading-snug text-[color:var(--ink)] md:text-2xl">
                  "Imagine you're 19. You've never stayed in a hotel. You've never walked through a city full of skyscrapers. You don't dream about becoming a recording artist, because nobody has ever shown you that a life like that could be yours. So you sing — out on the dirt road, because there's no signal to pull you anywhere else, no audience, no one telling you what to be."
                </blockquote>
                <figcaption className="mt-4 text-sm uppercase tracking-[0.28em] text-[color:var(--ink)]/55">
                  Artist perspective
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>


        <section className="px-5 py-20 bg-[color:var(--ink)]/5 border-y border-[color:var(--ink)]/10">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <Music className="h-5 w-5 text-[color:var(--gold)]" />
                <h2 className="font-display text-2xl text-[color:var(--ink)]">Tracks</h2>
              </div>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-2">
              {TRACKS.map((track, i) => (
                <Reveal key={track.title} delay={0.1 + i * 0.1}>
                  <div className="rounded-2xl border border-[color:var(--ink)]/15 bg-white p-8 md:p-10">
                    <h3 className="font-display text-3xl text-[color:var(--ink)]">{track.title}</h3>
                    <p className="mt-1 text-sm text-[color:var(--ink)]/60 uppercase tracking-wider">{track.sub}</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 text-sm text-[color:var(--ink)]/80">
                      {track.credits.map(([label, value]) => (
                        <div key={label}>
                          <span className="font-medium text-[color:var(--ink)]">{label}</span><br />{value}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl border border-[color:var(--ink)]/10">
                      <iframe
                        src={track.embed}
                        title={`${track.title} — ${track.sub}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="h-full w-full"
                      />
                    </div>
                    <a
                      href={track.watch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-2.5 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
                    >
                      <ExternalLink className="h-4 w-4" /> Watch on YouTube
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 bg-[color:var(--offwhite)]">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <Film className="h-5 w-5 text-[color:var(--gold)]" />
                <h2 className="font-display text-2xl text-[color:var(--ink)]">Producer</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-[color:var(--ink)]/85">
                <p>
                  <strong className="text-[color:var(--ink)]">Phil Bölke</strong> (PhD Eng, MEng, BEng — North-West University, Potchefstroom) is the founder and CEO of ARCOVEL Technologies International and the owner and executive producer of ThatGuy Productions International. He is an NRF-rated researcher with active PCT patent filings in quantum-mechanical systems engineering.
                </p>
                <p>
                  ThatGuy Productions International operates as a fully integrated studio facility built into the Baviaanskloof, Eastern Cape. It handles recording, mixing, mastering, and distribution, and has produced and released multiple Afrikaans titles under RouteNote distribution including Phil Bölke's own debut album <em>Dankie Vir Die Hande</em> (released May 30, 2026), which includes <em>Hulle Weet Nie Wat Ons Weet</em>.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 py-20 bg-[color:var(--ink)]/5 border-t border-[color:var(--ink)]/10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <Download className="h-5 w-5 text-[color:var(--gold)]" />
                <h2 className="font-display text-2xl text-[color:var(--ink)]">Press Documents</h2>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {PRESS_DOCS.map((doc, i) => (
                <Reveal key={doc.href} delay={i * 0.1}>
                  <div className="flex flex-col rounded-2xl border border-[color:var(--ink)]/15 bg-white p-6">
                    <h3 className="font-display text-lg text-[color:var(--ink)]">{doc.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-[color:var(--ink)]/70">{doc.description}</p>
                    <a
                      href={doc.href}
                      download={doc.filename}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-2 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
                    >
                      <Download className="h-4 w-4" /> Download .docx
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-night px-5 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-5 w-5 text-[color:var(--gold)]" />
                <h2 className="font-display text-2xl text-[color:var(--cream)]">Press Contact</h2>
              </div>
              <div className="space-y-3 text-[color:var(--cream)]/80">
                <p className="text-lg"><strong className="text-[color:var(--cream)]">Label</strong> — ThatGuy Productions International</p>
                <p className="text-sm text-[color:var(--cream)]/55 mt-6">For general press inquiries, use the contact details provided by your industry liaison or reach ThatGuy Productions via social channels listed below.</p>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}
