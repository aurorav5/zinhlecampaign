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
  `The road home is a dirt one. It cuts through the Baviaanskloof in the Eastern Cape — mountains that don't ask permission, afternoons that move slow enough to hear yourself think. I was driving it one afternoon when I found an old tortoise parked in the middle of the track.`,
  `I stopped, got out, and carried it across. Heavier than it looked. When I straightened up, dust still on my hands, I heard someone singing.`,
  `Not a performance. Not rehearsal. A young woman walking alone, singing to herself the way you only do when you're certain nobody is listening.`,
  `Her name is Zinhle.`,
  `She's nineteen. Grew up on a farm in this valley, where her mother still works. No studio experience. No vocal coach. No one had ever formally told her what she carries — she'd never had a reason to think it mattered. I didn't discover a project that day. I discovered a voice that didn't know it was being watched.`,
  `The first time she came to record, she wouldn't sit on the couch. Stood in the doorway with her shoes clean and her voice quiet, as if the studio might be a place she wasn't allowed to want.`,
  `We recorded anyway. By the end of that session, she had something that stopped her own family cold when they played it back in the car. Her mother heard it for the first time on Father's Day and couldn't hold herself together.`,
  `The single is called "Who I Am." It's the first recorded work she has ever made.`,
  `That's the part of the story that's beautiful. It isn't the whole story.`,
  `Most artists don't fail because of talent. They fail because arriving costs money. And when arriving costs money you don't have, someone else pays for it — and when someone else pays, they begin to shape the outcome. Not always deliberately. Almost always inevitably.`,
  `Zinhle's dream is changing now. It's no longer just a thing she does when the road is empty — she's heard it back, she knows it's real, and that means the danger is real too: the danger of arriving without footing, without a little money of her own, without a way to say yes or no on her own terms.`,
  `That's what this is about. Not making a star. Just giving a nineteen-year-old enough room to find out what her voice can become when nobody owns it but her.`,
  `My name is Phil Bölke. I'm an engineer and producer in this valley — I also have a patent filing years in the making, due December 2026, that should probably be getting this time instead. But some things you don't walk away from, and some voices you don't let get smaller just because the road around them is quiet.`,
  `If you've ever had someone believe in you before you believed in yourself, you already know what this is.`,
];

const IMAGINE = [
  "You grew up on a farm because that's where your mother works. The Baviaanskloof is all you've ever really known. You've never stayed in a hotel. You've never walked through a city full of skyscrapers. You don't dream about becoming a recording artist, because nobody has ever shown you that a life like that could be yours.",
  "So you sing. Out on the dirt road, because there's no signal out there to pull you anywhere else, no audience, no one telling you what to be. Just you and the sound of your own voice in the open air.",
  "Then one afternoon, a stranger hears you. And for the first time, the dream stops being private.",
];

function StoryPage() {
  return (
    <article className="bg-[color:var(--offwhite)] px-5 pt-32 pb-24 text-[color:var(--ink)] md:pt-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">The Story</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            She Sang to a Tortoise
            <span className="block text-[color:var(--ink)]/70">And Didn't Know I Was There</span>
          </h1>
          <p className="mt-4 text-sm text-[color:var(--ink)]/55">
            Phil Bölke · Baviaanskloof, Eastern Cape
          </p>
        </Reveal>

        <Reveal>
          <aside className="mt-12 rounded-2xl border-l-4 border-[color:var(--gold)] bg-white/60 p-7 md:p-9">
            <p className="font-display text-2xl text-[color:var(--ink)]">Imagine you're 19 years old.</p>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[color:var(--ink)]/80">
              {IMAGINE.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </aside>
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
