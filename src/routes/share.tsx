import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ShareButtons } from "@/components/site/ShareButtons";

export const Route = createFileRoute("/share")({
  head: () => ({
    meta: [
      { title: "Share — She Sang to a Tortoise" },
      {
        name: "description",
        content:
          "Share this even if you can't do anything else. The right person seeing it costs nothing and might change everything.",
      },
      { property: "og:title", content: "Share — She Sang to a Tortoise" },
      {
        property: "og:description",
        content: "The right person seeing it costs nothing and might change everything.",
      },
      { property: "og:url", content: "/share" },
    ],
    links: [{ rel: "canonical", href: "/share" }],
  }),
  component: SharePage,
});

function SharePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website message from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:philb.tgp@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="bg-night px-5 pt-32 pb-24 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--gold)]">Share</p>
          <h1 className="mt-4 font-display text-4xl text-[color:var(--cream)] sm:text-5xl">
            Share this even if you can't do anything else.
          </h1>
          <p className="mt-5 text-[color:var(--cream)]/80">
            The right person seeing it costs nothing and might change everything.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <ShareButtons />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 border-t border-[color:var(--gold)]/20 pt-10">
            <h2 className="font-display text-xl text-[color:var(--cream)]">Message Phil directly</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://wa.me/27648927071"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href="mailto:philb.tgp@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-5 py-2.5 text-sm text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Mail className="h-4 w-4" /> philb.tgp@gmail.com
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <form onSubmit={onSubmit} className="mt-12 space-y-5">
            <h2 className="font-display text-xl text-[color:var(--cream)]">Or send a note</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-[color:var(--cream)]/60">Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[color:var(--gold)]/30 bg-[color:var(--ink)]/70 px-3 py-2.5 text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-wider text-[color:var(--cream)]/60">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[color:var(--gold)]/30 bg-[color:var(--ink)]/70 px-3 py-2.5 text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-[color:var(--cream)]/60">Message</span>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-[color:var(--gold)]/30 bg-[color:var(--ink)]/70 px-3 py-2.5 text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold)] px-6 py-3 text-sm font-medium text-[color:var(--ink)] shadow-glow-gold transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" /> Send
            </button>
            <p className="text-xs text-[color:var(--cream)]/50">
              Opens in your email app, addressed to philb.tgp@gmail.com.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
