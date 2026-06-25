import { useEffect, useRef, useState } from "react";

/**
 * HeroAudioPlayer
 *
 * Browsers block autoplay-with-sound everywhere (Chrome, Safari, Firefox).
 * This is the closest real equivalent:
 *  1. Track starts muted-autoplay the instant the page loads (always allowed)
 *  2. A prominent "Tap for sound" pill pulses over the hero
 *  3. The FIRST tap/click anywhere on the page unmutes — track is already
 *     mid-playback, so it feels like it was playing with sound all along
 *  4. After that, a small mute toggle persists in the corner
 */

interface HeroAudioPlayerProps {
  src: string;
  title?: string;
}

export function HeroAudioPlayer({ src, title = "Who I Am" }: HeroAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasUnmutedOnce, setHasUnmutedOnce] = useState(false);

  // Start muted-autoplay as soon as the component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 1;

    audio.play().catch(() => {
      // Even muted autoplay can be blocked in rare cases (e.g. data-saver mode).
      // It'll just start on first interaction instead via the global listener below.
    });
  }, []);

  // First tap/click ANYWHERE on the page unmutes the already-playing track
  useEffect(() => {
    if (hasUnmutedOnce) return;

    const unmuteOnFirstInteraction = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = false;
      setMuted(false);
      setHasUnmutedOnce(true);

      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    window.addEventListener("pointerdown", unmuteOnFirstInteraction, { once: true });
    window.addEventListener("keydown", unmuteOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unmuteOnFirstInteraction);
      window.removeEventListener("keydown", unmuteOnFirstInteraction);
    };
  }, [hasUnmutedOnce]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const next = !muted;
    audio.muted = next;
    setMuted(next);
    setHasUnmutedOnce(true);

    if (!next && audio.paused) {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" playsInline />

      {/* "Tap for sound" prompt — only shows before first interaction */}
      {muted && !hasUnmutedOnce && (
        <div
          className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center"
          aria-hidden="true"
        >
          <div className="animate-pulse rounded-full bg-black/70 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm shadow-lg">
            🔊 Tap anywhere for sound — &ldquo;{title}&rdquo;
          </div>
        </div>
      )}

      {/* Persistent mute toggle, corner-pinned */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute audio" : "Mute audio"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/80 active:scale-95"
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </>
  );
}
