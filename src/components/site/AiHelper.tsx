import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const SUGGESTIONS = [
  "What is this campaign about?",
  "How do I donate?",
  "Write me a WhatsApp share message",
];

export function AiHelper() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || status === "submitted" || status === "streaming") return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      {/* Toggle button — bottom-left so it doesn't fight the mute control */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close campaign helper" : "Ask the campaign helper"}
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold)] text-[color:var(--ink)] shadow-glow-gold transition hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Campaign helper"
          className="fixed bottom-20 left-5 z-50 flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--ink)] shadow-2xl"
        >
          <header className="border-b border-white/10 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)]">
              Campaign helper
            </p>
            <p className="mt-0.5 font-display text-base text-[color:var(--cream)]">
              Ask about Zinhle, the music, or how to help
            </p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-sm">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-[color:var(--cream)]/70">
                  I can answer questions about the campaign and even draft share messages for you.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-[color:var(--cream)]/85 transition hover:border-[color:var(--gold)]/40 hover:bg-white/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              return (
                <div key={m.id} className={m.role === "user" ? "text-right" : ""}>
                  {m.role === "user" ? (
                    <div className="inline-block max-w-[85%] rounded-2xl bg-[color:var(--gold)] px-3 py-2 text-left text-[color:var(--ink)]">
                      {text}
                    </div>
                  ) : (
                    <div className="space-y-2 text-[color:var(--cream)]/90 [&_a]:text-[color:var(--gold)] [&_a]:underline [&_strong]:text-[color:var(--cream)] [&_p]:leading-relaxed [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs">
                      <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}

            {(status === "submitted" || status === "streaming") &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex items-center gap-2 text-[color:var(--cream)]/60">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
                </div>
              )}

            {error && (
              <p className="text-xs text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="border-t border-white/10 p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                rows={1}
                placeholder="Ask anything about the campaign…"
                className="max-h-32 flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[color:var(--cream)] placeholder:text-[color:var(--cream)]/40 focus:border-[color:var(--gold)]/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || status === "submitted" || status === "streaming"}
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--gold)] text-[color:var(--ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
