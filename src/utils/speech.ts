const FEMALE_VOICE_KEYWORDS = [
  'female',
  'google uk english female',
  'google us english',
  'aria',
  'jenny',
  'zira',
  'libby',
  'sonia',
  'hazel',
  'susan',
  'samantha',
  'victoria',
  'karen',
  'moira',
  'tessa',
  'fiona',
  'serena',
  'kate',
  'nora',
  'allison',
  'ava',
  'joanna',
  'salli',
  'kendra',
  'kimberly',
  'ivy',
  'emma',
  'amy',
  'olivia',
  'chloe',
  'claire',
  'ellen',
  'natasha',
  'clara',
  'mia',
  'eva',
];

const MALE_VOICE_KEYWORDS = [
  'male',
  'david',
  'mark',
  'george',
  'daniel',
  'alex',
  'fred',
  'ryan',
  'guy',
  'thomas',
  'arthur',
  'oliver',
  'james',
  'chris',
  'paul',
  'rishi',
  'aaron',
  'albert',
];

let cachedVoices: SpeechSynthesisVoice[] = [];
let selectedVoiceURI: string | null = null;

function refreshVoiceList(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return [];
  }
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function getFemaleEnglishVoices(): SpeechSynthesisVoice[] {
  const allVoices = refreshVoiceList();
  const englishVoices = allVoices.filter((v) =>
    v.lang.toLowerCase().startsWith('en')
  );

  const explicitlyFemale = englishVoices.filter((v) => {
    const name = v.name.toLowerCase();
    const isFemale = FEMALE_VOICE_KEYWORDS.some((kw) => name.includes(kw));
    const isMale = MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw));
    return isFemale && !isMale;
  });

  if (explicitlyFemale.length > 0) {
    return explicitlyFemale.sort((a, b) => {
      const aScore = scoreFemaleVoice(a);
      const bScore = scoreFemaleVoice(b);
      return bScore - aScore;
    });
  }

  const nonMaleEnglish = englishVoices.filter((v) => {
    const name = v.name.toLowerCase();
    return !MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw));
  });

  if (nonMaleEnglish.length > 0) {
    return nonMaleEnglish;
  }

  return englishVoices;
}

function scoreFemaleVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;
  if (name.includes('google uk english female')) score += 100;
  if (name.includes('google us english')) score += 90;
  if (name.includes('natural')) score += 80;
  if (name.includes('aria') || name.includes('jenny') || name.includes('sonia') || name.includes('libby')) score += 75;
  if (name.includes('samantha') || name.includes('karen') || name.includes('zira')) score += 65;
  if (name.includes('female')) score += 50;
  if (voice.lang.toLowerCase() === 'en-gb') score += 12;
  if (voice.lang.toLowerCase() === 'en-us') score += 10;
  return score;
}

export function getBestFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = getFemaleEnglishVoices();
  if (voices.length === 0) return null;

  if (selectedVoiceURI) {
    const match = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (match) return match;
  }

  return voices[0];
}

export function setPreferredFemaleVoice(voiceURI: string): void {
  selectedVoiceURI = voiceURI;
}

export function preloadVoices(onLoaded?: () => void): () => void {
  if (!isSpeechSupported()) return () => {};
  refreshVoiceList();
  const handler = () => {
    refreshVoiceList();
    onLoaded?.();
  };
  window.speechSynthesis.addEventListener('voiceschanged', handler);
  return () => {
    window.speechSynthesis.removeEventListener('voiceschanged', handler);
  };
}

export interface SpeakOptions {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

function normalizeTextForSpeech(raw: string): string {
  return raw
    .replace(/\((n|v|adj|adv)\)/gi, '')
    .replace(/chicken\s*\(hen\)/gi, 'chicken, hen')
    .replace(/\(It['’]s\)/gi, "It's")
    .replace(/eyebrow\(s\)/gi, 'eyebrow')
    .replace(/eyelash\(es\)/gi, 'eyelash')
    .replace(/olive\(s\)/gi, 'olives')
    .replace(/nice\/good/gi, 'nice')
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakEnglish(text: string, options?: SpeakOptions): void {
  if (!isSpeechSupported()) {
    options?.onEnd?.();
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(normalizeTextForSpeech(text));
  const voice = getBestFemaleVoice();

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = 'en-US';
  }

  // Slight pitch lift preserves clear female vocal timbre even on generic fallback engines
  const voiceName = voice?.name.toLowerCase() ?? '';
  const alreadyFemale = FEMALE_VOICE_KEYWORDS.some((kw) => voiceName.includes(kw));
  utterance.pitch = alreadyFemale ? 1.06 : 1.24;
  utterance.rate = options?.rate ?? 0.88;
  utterance.volume = 1;

  utterance.onstart = () => options?.onStart?.();
  utterance.onend = () => options?.onEnd?.();
  utterance.onerror = () => options?.onEnd?.();

  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
}
