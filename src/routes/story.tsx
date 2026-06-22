import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "The Story — She Sang to a Tortoise" },
      {
        name: "description",
        content:
          "A dirt road in the Baviaanskloof. An ancient tortoise. A 19-year-old singing alone. The full story, in Phil Bölke's words.",
      },
      { property: "og:title", content: "The Story — She Sang to a Tortoise" },
      {
        property: "og:description",
        content:
          "A dirt road, an ancient tortoise, and a 19-year-old singing alone in the Eastern Cape. The full story.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/story" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: StoryPage,
});

const PARAGRAPHS = [
  "There's a dirt road in the Baviaanskloof, Eastern Cape, that most people will never drive. It cuts through one of the most remote, most beautiful valleys in South Africa — a place where the mountain meets the sky and time moves differently.",
  "I was driving home on that road when I found a massive old tortoise planted square in the middle of it. The kind that's been walking this earth longer than any of us have been worrying about anything. I stopped, got out, and moved it — barely, it was enormous — and stood there for a moment just breathing, looking at this ancient thing that had absolutely nowhere urgent to be.",
  "That's when I heard her.",
  "A young woman, walking the road, coming closer. Singing to herself. Not performing. Not practicing. Just singing the way you only do when you are completely alone and completely free.",
  "I didn't move. I didn't want to break whatever that was.",
  "She is 19 years old. She grew up on a farm in this valley. Nobody handed her a dream — not because people didn't care, but because in her world, that kind of dream simply wasn't on the table. She has never had a vocal coach, never had a recording session, never stood in a proper studio until recently. The first time she came to record she was too respectful to sit on the couch. Too humble to use the same cups.",
  "That's who she is.",
  "I'm Phil Bölke — an engineer, a producer, and someone who has spent years working on technology that demands everything I have. I have a PCT patent filing deadline in December 2026 that represents years of my life. Time is the one thing I genuinely cannot afford to waste right now.",
  "I'm spending it on this anyway. Because some things you don't walk away from.",
  "We recorded together. Her voice on those recordings stopped everyone who heard them — including her own mother, who heard them for the first time on Father's Day and couldn't hold herself together. The daughter just stood there twinkling, not fully understanding yet what everyone else in the room already knew.",
  "When she returns, she comes back to a fully equipped professional studio — ThatGuy Productions International, built into the Baviaanskloof itself — where her debut album will be produced in full, at no cost to her. Recorded, mastered, distributed. The real thing, done properly. That part is already decided. That part is already mine to carry.",
  "But a studio cannot give her the one thing she actually needs first: the financial footing to move through a world that will try to own her if she arrives without it. Talent is not the problem. The world is full of people with extraordinary gifts who never got anywhere because the moment they stepped toward something, they needed someone else's money, someone else's car, someone else's couch — and that dependency became the price of entry. Slowly, quietly, the dream stops being theirs.",
  "There is a campaign. This page is part of it.",
  "If you've ever had someone believe in you before you believed in yourself, you already know exactly what this is.",
];

function StoryPage() {
  return (
    <article className="bg-[color:var(--offwhite)] px-5 pt-32 pb-24 text-[color:var(--ink)] md:pt-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Story</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            She Sang to a Tortoise
            <span className="block text-[color:var(--ink)]/70">— And Didn't Know I Was There</span>
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--ink)]/55">
            By Phil Bölke · Baviaanskloof, Eastern Cape
          </p>
        </Reveal>

        <div className="mt-14 space-y-7">
          {PARAGRAPHS.map((p, i) => (
            <Reveal key={i} delay={Math.min(i, 4) * 0.05}>
              <p
                className={`font-body leading-relaxed ${
                  p.length < 60
                    ? "font-display text-2xl text-[color:var(--ink)]"
                    : "text-lg text-[color:var(--ink)]/85"
                }`}
              >
                {p}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 border-t border-[color:var(--ink)]/15 pt-10">
            <Link
              to="/music"
              className="inline-flex items-center gap-2 font-display text-xl text-[color:var(--ink)] gold-underline"
            >
              Listen to her voice <ArrowRight className="h-5 w-5 text-[color:var(--gold)]" />
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
