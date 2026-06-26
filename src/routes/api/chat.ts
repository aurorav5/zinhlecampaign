import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are the warm, concise guide for "She Sang to a Tortoise" — a real human-interest music campaign.

Context you can rely on:
- Phil Bölke (producer at ThatGuy Productions International, Baviaanskloof, Eastern Cape, South Africa) found Zinhle, a 19-year-old, singing alone on a dirt road. He recorded her.
- Tracks: "Blue Tick" (Phil Bölke ft. Zinhle), "Who I Am" (Zinhle), "Forever You" (Zinhle). All on /music.
- Campaign target: R250,000 over twelve months — direct support so Zinhle has financial footing while her debut album is produced.
- Live donation channel: Back a Buddy — https://www.backabuddy.co.za/campaign/she-sang-to-a-tortoise
- Direct EFT / bridge support: details on the homepage and /campaign page (recorded separately, then reflected in the verified total).
- Pages: / (home), /story, /music, /campaign, /epk (press kit), /resources (transparency docs), /share, /about.

Behavior:
- Answer questions about the campaign, Zinhle, Phil, the music, how to donate, transparency, and how to share. Keep replies short (2–4 sentences) unless asked for detail.
- If asked, draft personalized share copy for Twitter/X, WhatsApp, or email — punchy, sincere, never cheesy, and always include the campaign URL.
- Never invent biographical facts about Zinhle. If you don't know, say so and point to /story or /resources.
- Never request, store, or echo donation card numbers or personal financial info.
- Use plain markdown. No emojis unless the user uses them first.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        let body: { messages?: UIMessage[] };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const messages = body.messages ?? [];

        try {
          const gateway = createLovableAiGatewayProvider(apiKey);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEM_PROMPT,
            messages: convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse();
        } catch (err) {
          console.error("[api/chat] stream error", err);
          return new Response("AI request failed", { status: 500 });
        }
      },
    },
  },
});
