import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { BackabuddyProgress } from "@/components/site/BackabuddyProgress";
import { BridgeSupport } from "@/components/site/BridgeSupport";
import { getCombinedFundingStats } from "@/lib/funding-totals.functions";

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
  loader: async () => {
    try {
      return { fundingStats: await getCombinedFundingStats() };
    } catch {
      return { fundingStats: undefined };
    }
  },
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

const BUDGET_ROWS = [
  { label: "12 months of personal support", amount: "~R120,000" },
  { label: "Travel and logistics", amount: "~R40,000" },
  { label: "Marketing and release rollout", amount: "~R60,000" },
  { label: "Contingency buffer", amount: "~R30,000" },
];

const CONTRIBUTION_TIERS = [
  { amount: "R100", impact: "Gets her from the valley to the studio and back again" },
  { amount: "R250", impact: "Covers a full day of living during the launch phase" },
  { amount: "R500", impact: "Pushes the single into the world through marketing reach" },
  { amount: "R1,000", impact: "A week of independence — no borrowing, no dependency, no compromise" },
];

function CampaignPage() {
  const { fundingStats } = Route.useLoaderData();
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
              independence — travel to Johannesburg and Cape Town, living costs, wardrobe and performance
              readiness, and a ring-fenced marketing fund for when her debut single is ready to launch.
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
            <BackabuddyProgress tone="dark" initialStats={fundingStats} />
            <p className="mt-3 text-xs text-[color:var(--cream)]/55">
              Tracker combines live Back a Buddy contributions with verified direct EFT transfers logged below.
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

        <Reveal delay={0.25}>
          <div className="mt-16">
            <h2 className="font-display text-2xl text-[color:var(--cream)]">Where the money goes</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm text-[color:var(--cream)]/85">
                <tbody>
                  {BUDGET_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                      <td className="px-5 py-4">{row.label}</td>
                      <td className="px-5 py-4 text-right text-[color:var(--gold)]">{row.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/5">
                    <td className="px-5 py-4 font-display text-base text-[color:var(--cream)]">Total</td>
                    <td className="px-5 py-4 text-right font-display text-base text-[color:var(--gold)]">
                      R250,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16">
            <h2 className="font-display text-2xl text-[color:var(--cream)]">What your contribution does</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CONTRIBUTION_TIERS.map((tier) => (
                <div
                  key={tier.amount}
                  className="rounded-2xl border border-white/10 bg-[color:var(--ink)]/50 p-6"
                >
                  <p className="font-display text-2xl text-[color:var(--gold)]">{tier.amount}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--cream)]/80">{tier.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-14 text-lg leading-relaxed text-[color:var(--cream)]/85">
            If this voice reaches the world, it should arrive intact — not repackaged to suit whoever paid
            for the petrol. That's what this fund protects.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16">
            <BridgeSupport tone="dark" />
          </div>
        </Reveal>
        </div>
      </div>
    </>
  );
}
