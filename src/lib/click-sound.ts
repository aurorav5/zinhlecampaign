/**
 * Synthesized kick-drum click using the Web Audio API — no audio file needed.
 * One short pitched-down sine "thump" + a tiny click transient.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx) return audioCtx;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  return audioCtx;
}

export function playKick(volume = 0.55): void {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const now = ctx.currentTime;

  // Sub-thump: sine 130Hz -> 45Hz pitch envelope
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);

  // Click transient: short noise burst
  const noiseLen = Math.floor(ctx.sampleRate * 0.012);
  const buf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / noiseLen);
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const nGain = ctx.createGain();
  nGain.gain.value = volume * 0.35;
  noise.connect(nGain).connect(ctx.destination);
  noise.start(now);
}
