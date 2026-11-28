let audioCtx: AudioContext | null = null;
let sfxEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSfxEnabled(enabled: boolean): void {
  sfxEnabled = enabled;
}

export function isSfxEnabled(): boolean {
  return sfxEnabled;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  delay = 0,
  volume = 0.12
): void {
  if (!sfxEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

export function playFlipSound(): void {
  playTone(520, 0.08, 'triangle', 0, 0.07);
}

export function playSuccessSound(): void {
  playTone(523.25, 0.12, 'sine', 0, 0.11);
  playTone(659.25, 0.16, 'sine', 0.09, 0.11);
}

export function playErrorSound(): void {
  playTone(260, 0.14, 'triangle', 0, 0.09);
  playTone(210, 0.18, 'triangle', 0.1, 0.08);
}

export function playRewardSound(): void {
  playTone(523.25, 0.14, 'sine', 0, 0.11);
  playTone(659.25, 0.14, 'sine', 0.1, 0.11);
  playTone(783.99, 0.16, 'sine', 0.2, 0.12);
  playTone(1046.5, 0.28, 'sine', 0.31, 0.12);
}

export function playCrashSound(): void {
  playTone(160, 0.16, 'sawtooth', 0, 0.13);
  playTone(110, 0.26, 'sawtooth', 0.08, 0.12);
}

export function playHopSound(): void {
  playTone(360, 0.08, 'sine', 0, 0.1);
  playTone(540, 0.1, 'triangle', 0.05, 0.09);
}

export function playEatSound(): void {
  playTone(440, 0.08, 'triangle', 0, 0.11);
  playTone(587.33, 0.08, 'triangle', 0.1, 0.11);
  playTone(783.99, 0.16, 'sine', 0.2, 0.12);
}

export function playWaterDropSound(): void {
  playTone(390, 0.12, 'sine', 0, 0.12);
  playTone(250, 0.14, 'sine', 0.09, 0.11);
  playTone(150, 0.22, 'sine', 0.19, 0.12);
}

export function playBonkSound(): void {
  playTone(480, 0.07, 'triangle', 0, 0.11);
  playTone(720, 0.11, 'sine', 0.05, 0.11);
}

export function playChestOpenSound(): void {
  playTone(523.25, 0.1, 'triangle', 0, 0.11);
  playTone(659.25, 0.1, 'triangle', 0.08, 0.11);
  playTone(783.99, 0.12, 'triangle', 0.16, 0.12);
  playTone(1046.5, 0.24, 'sine', 0.25, 0.13);
}



