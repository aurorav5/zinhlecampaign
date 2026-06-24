import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Transparency Documents — She Sang to a Tortoise" },
      {
        name: "description",
        content:
          "Signed Commitment Letter and Artist Development Agreement governing the Zinhle development project.",
      },
      { property: "og:title", content: "Transparency Documents — She Sang to a Tortoise" },
      {
        property: "og:description",
        content: "Signed documents governing the Zinhle development project, published in full.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

const DOCS = [
  {
    title: "Commitment Letter",
    description: "Phil Bölke's signed public statement of intent and accountability.",
    href: "/assets/Commitment_Letter_Zinhle_ThatGuy_signed.docx",
    filename: "Commitment_Letter_Zinhle_ThatGuy_signed.docx",
  },
  {
    title: "Artist Development Agreement",
    description: "The signed bilateral agreement template governing the development period.",
    href: "/assets/Artist_Development_Agreement_Zinhle_ThatGuy_signed.docx",
    filename: "Artist_Development_Agreement_Zinhle_ThatGuy_signed.docx",
  },
];

function ResourcesPage() {
  return (
    <section className="bg-night px-5 pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">Transparency</p>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl">
            The Agreements — Signed &amp; Published
          </h1>
          <p className="mt-6 max-w-xl text-[color:var(--cream)]/80">
            For transparency, the signed Commitment Letter and Artist Development Agreement governing this
            project are available below.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DOCS.map((doc, i) => (
            <Reveal key={doc.href} delay={i * 0.1}>
              <article className="group flex h-full flex-col rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--ink)]/60 p-7 transition-colors hover:border-[color:var(--gold)]/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[color:var(--gold)]/30 text-[color:var(--gold)]">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-xl text-[color:var(--cream)]">{doc.title}</h2>
                <p className="mt-3 flex-1 text-sm text-[color:var(--cream)]/75">{doc.description}</p>
                <a
                  href={doc.href}
                  download={doc.filename}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" /> Download .docx
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
