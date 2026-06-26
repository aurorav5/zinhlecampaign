import { useEffect } from "react";
import { playKick } from "@/lib/click-sound";

/**
 * Global kick-drum click sound on every button/link interaction.
 * Mounted once at the root. Uses pointerdown for snappy response.
 * Respects prefers-reduced-motion and an opt-out via localStorage("sound:off").
 */
export function ClickSoundProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const handler = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (localStorage.getItem("sound:off") === "1") return;
      const target = e.target as Element | null;
      if (!target || !target.closest) return;
      const hit = target.closest(
        'button, a, [role="button"], [role="link"], summary, input[type="submit"], input[type="button"]',
      );
      if (!hit) return;
      // Skip the mute toggle so users don't kick when toggling audio
      if (hit.getAttribute("aria-label")?.toLowerCase().includes("mute")) return;
      playKick();
    };

    window.addEventListener("pointerdown", handler, { passive: true });
    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  return null;
}
