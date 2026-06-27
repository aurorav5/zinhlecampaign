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
  "The road home is a dirt one. It cuts through the Baviaanskloof in the Eastern Cape — a valley where the mountains don't ask permission, and the afternoons move so slowly you can hear yourself thinking. I was driving it late one afternoon when I found an old tortoise parked in the middle of the track. Massive thing. The kind that's been walking these hills since before any of us had plans.",
  "I stopped the bakkie, got out, and lifted it across. It was heavier than I expected. When I stood up again, dust on my hands, I heard singing.",
  "Not a performance. Not a song meant for an audience. A young woman walking alone, miles from anywhere, singing to herself the way you only do when you believe no one is listening.",
  "I stayed still. I didn't want to interrupt whatever that was. She was nineteen, and she had grown up on a farm in this valley. In her world, a dream like this wasn't missing — it had never been placed on the table in the first place. No singing lessons. No studio. No one telling her that voice was anything other than a private thing, like talking to yourself.",
  "I watched her walk past, still singing, and I felt something shift. It was not a plan. It was not a project. It was the feeling that someone had just handed you something fragile and asked, without saying a word, if you would be careful with it.",
  "Her name is Zinhle.",
  "The first time she came to record, she was too respectful to sit on the couch. Too humble to use the same cups. She stood in the doorway with her shoes clean and her voice quiet, as if the studio might be a place she wasn't allowed to want.",
  "We recorded anyway. I played those recordings to people who know music. Each time, the room stopped. Her mother heard them for the first time on Father's Day and couldn't hold herself together. Zinhle stood there twinkling, not understanding yet what everyone else already knew: that this was not small, and that it was no longer only hers.",
  "That is the part of the story that is beautiful. But it is not the whole story.",
  "A voice like that is not enough by itself. The world is full of people who were given a gift and then slowly convinced to hand it over — for a ride, for a place to sleep, for someone else's permission. I have watched it happen. The dream starts as yours, and then it becomes a debt, and then one day you look up and you are singing songs you never chose for people you do not know.",
  "Zinhle's dream is changing now. It is no longer just a thing she does when the road is empty. She has heard it back. She knows it is real. And because of that, the danger is also real — the danger of arriving without footing, without a little money of her own, without a way to say yes or no on her own terms.",
  "That is what this is about. Not making a star. Not building a brand. Just giving a nineteen-year-old enough room to find out what her voice can become when nobody owns it but her.",
  "My name is Phil Bölke. I am an engineer and producer in this valley. I have a studio here, and I have time I should probably be spending on something else — a patent filing that has been years of my life and is due in December 2026. Time is not something I have in abundance.",
  "But I am spending it on this anyway. Because some things you don't walk away from, and some voices you don't let get smaller just because the road around them is quiet.",
  "If you have ever had someone believe in you before you believed in yourself, you already know what this is. You are the reason I am writing this down.",
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
