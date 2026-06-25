import { Reveal } from "@/components/site/Reveal";

/**
 * HeroVideoPlayer
 *
 * Small, visible YouTube embed for the hero — same visual treatment
 * (rounded border, gold glow) as the full-size embeds on /music, just
 * scaled down. Autoplay starts muted (the only thing browsers allow);
 * the viewer can unmute using YouTube's own player controls.
 */

interface HeroVideoPlayerProps {
  videoId: string;
  title?: string;
}

export function HeroVideoPlayer({ videoId, title = "Who I Am" }: HeroVideoPlayerProps) {
  return (
    <Reveal delay={0.2}>
      <div className="fixed bottom-5 right-5 z-50 w-36 sm:w-52">
        <div className="overflow-hidden rounded-xl border border-[color:var(--gold)]/30 shadow-glow-gold">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&modestbranding=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="eager"
            className="aspect-video h-full w-full"
          />
        </div>
        <p className="mt-1.5 text-center text-[10px] uppercase tracking-[0.25em] text-[color:var(--cream)]/60">
          {title}
        </p>
      </div>
    </Reveal>
  );
}
