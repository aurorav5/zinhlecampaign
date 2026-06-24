import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { BackabuddyProgress } from "@/components/site/BackabuddyProgress";
import { BridgeSupport } from "@/components/site/BridgeSupport";

const BACKABUDDY_URL =
  "https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise";

export const Route = createFileRoute("/campaign")({
  head: () => ({
    meta: [
      { title: "The Campaign — Twelve months for Zinhle" },
      {
        name: "description",
        content:
          "R250,000, joint-signatory account, going directly to Zinhle. Nothing to ThatGuy Productions. The studio is carried separately.",
      },
      { property: "og:title", content: "The Campaign — Twelve months for Zinhle" },
      {
        property: "og:description",
        content:
          "R250,000, joint-signatory account, going directly to Zinhle. Studio carried separately.",
      },
      { property: "og:url", content: "/campaign" },
    ],
    links: [{ rel: "canonical", href: "/campaign" }],
  }),
  component: CampaignPage,
});

const CAMPAIGN_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "DonateAction",
  "name": "She Sang to a Tortoise — Zinhle Artist Development Campaign",
  "description": "R250,000 target. Joint-signatory account. Going directly to Zinhle. Nothing to ThatGuy Productions.",
  "url": "https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise",
  "recipient": { "@type": "Person", "name": "Zinhle" },
  "agent": {
    "@type": "Organization",
    "name": "ThatGuy Productions International",
    "@id": "https://zinhlecampaign.lovable.app/#organization"
  }
});

function CampaignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: CAMPAIGN_JSON_LD }} />
      <div className="bg-night px-5 pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Campaign</p>
            <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl md:text-6xl">
              Twelve months. R250,000. Directly to Zinhle.
            </h1>
          </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[color:var(--cream)]/85">
            <p>
              A Back a Buddy campaign has been launched to give Zinhle twelve months of genuine financial
              independence — travel to Johannesburg and Cape Town, clothing, living costs, and a
              ring-fenced marketing fund for when her debut album is ready.
            </p>
            <p>
              The target is <span className="text-[color:var(--gold)]">R250,000</span>. Every rand goes
              directly to her, held in a dedicated business account with joint signatory control — neither
              Phil Bölke nor Zinhle can access it without the other. If the fund size warrants it, an
              independent accounting firm will be appointed as a third oversight party. Nothing goes to
              ThatGuy Productions in any form. The studio, the production, the album — Phil carries all of
              that separately, at no cost to the fund.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--ink)]/70 p-8 md:p-10">
            <BackabuddyProgress tone="dark" />
            <p className="mt-3 text-xs text-[color:var(--cream)]/55">
              Tracker reflects Back a Buddy contributions only. Direct bank transfers below are recorded separately.
            </p>
            <a
              href={BACKABUDDY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-7 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
            >
              Support on Back a Buddy <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16">
            <BridgeSupport tone="dark" />
          </div>
        </Reveal>
        </div>
      </div>
    </>
  );
}
