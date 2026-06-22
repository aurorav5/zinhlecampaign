import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import bankingQr from "@/assets/banking-qr.png";
import { Reveal } from "@/components/site/Reveal";
import { ProgressBar } from "@/components/site/ProgressBar";

const BACKABUDDY_URL =
  "https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise";

const BANKING = [
  ["Bank", "Capitec"],
  ["Account Holder", "Mr Philippus Bölke"],
  ["Business Name", "Thatguy Productions International"],
  ["Account Number", "2558008516"],
  ["SWIFT / BIC", "CABLZAJJ"],
  ["Branch Code", "470010"],
] as const;

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

function CampaignPage() {
  return (
    <div className="bg-night px-5 pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Campaign</p>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl md:text-6xl">
            There is a campaign.
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
            {/* TODO: update `raised` value as the campaign progresses. */}
            <ProgressBar raised={0} target={250000} />
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

        {/* Bridge support — visually distinct */}
        <Reveal delay={0.3}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-[color:var(--amber-warm)]/35 bg-gradient-to-br from-[color:var(--navy-deep)]/50 to-[color:var(--indigo-deep)]/30 p-8 md:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[color:var(--amber-warm)]">
              <Info className="h-4 w-4" /> Interim bridge support
            </div>
            <h2 className="mt-4 font-display text-2xl text-[color:var(--cream)] sm:text-3xl">
              Support right now, directly.
            </h2>
            <p className="mt-4 text-[color:var(--cream)]/80">
              The formal Back a Buddy campaign is live above. If you'd prefer to help immediately by bank
              transfer, you can send support directly below — every contribution will be recorded and
              accounted for. This goes directly to Phil Bölke and is distinct from the joint-account
              campaign.
            </p>

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-6">
                {BANKING.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-[color:var(--cream)]/55 uppercase tracking-wider text-xs sm:pt-0.5">
                      {k}
                    </dt>
                    <dd className="font-body text-[color:var(--cream)] sm:text-base">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-lg bg-white p-3">
                  <img
                    src={bankingQr}
                    alt="QR code containing the banking details listed alongside"
                    className="h-40 w-40"
                  />
                </div>
                <p className="text-xs text-[color:var(--cream)]/55">Scan for banking details</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
