// ChupiGpt Core Engine
// ---------------------------------------------------------------
// Mesin inferensi ultra-ringan. Tidak ada API. Tidak ada model.
// Hanya "Phoebe chupi" dalam berbagai bentuk.
//
// Chupi bukan kucing. Chupi adalah persona chibi Phoebe (Wuthering Waves)
// yang lahir dari meme komunitas — lucu, bandel, dan cuma bisa bilang
// satu hal: "chupi".
// ---------------------------------------------------------------

import { createHash } from "node:crypto";

/**
 * Bank respons "chupi", dikelompokkan berdasarkan mood.
 * Total ~30 variasi (spec: "Sedang").
 */
export const CHUPI_BANK = {
  neutral: [
    "Phoebe chupi.",
    "Chupi.",
    "Phoebe... chupi?",
    "Chupi chupi.",
    "Phoebe chupi chupi."
  ],
  happy: [
    "Phoebe chupi! ✨",
    "Chupiiii! 🎉",
    "Phoebe chupi chupi chupi!",
    "CHUPI!! Phoebe chupi!",
    "Yaay~ phoebe chupi!"
  ],
  sleepy: [
    "phoebe... chupi... zzz",
    "chu... pi...",
    "Phoebe chupi (ngantuk).",
    "chupiiii~ *nguap*",
    "phoebe chupi zzz zzz"
  ],
  angry: [
    "PHOEBE CHUPI!! 😤",
    "CHUPI. CHUPI. CHUPI!",
    "Grrr... phoebe chupi.",
    "Chupi?! CHUPI!",
    "Phoebe. Chupi. Sekarang."
  ],
  loving: [
    "Phoebe chupi 💕",
    "chupi chupi ❤️",
    "Phoebe chupi~ (peluk)",
    "chupiiii sayang~",
    "Phoebe chupi, forever chupi."
  ],
  dramatic: [
    "...phoebe... chupi.",
    "Di dunia yang bising ini, hanya ada satu kebenaran: phoebe chupi.",
    "Chupi bukan pilihan. Chupi adalah takdir.",
    "Phoebe chupi. Titik.",
    "Bahkan bintang pun berbisik: chupi."
  ]
};

export const MOODS = Object.keys(CHUPI_BANK);

// Keyword heuristik → mood. Sengaja bodoh, itu bagian dari lelucon.
const MOOD_KEYWORDS = {
  happy: ["senang", "happy", "hore", "yay", "😊", "😄", "gembira", "asik", "asyik", "wow"],
  sleepy: ["ngantuk", "tidur", "sleep", "capek", "lelah", "malem", "malam", "zzz"],
  angry: ["marah", "kesal", "angry", "bodoh", "goblok", "sial", "!!!", "😡"],
  loving: ["cinta", "sayang", "love", "❤", "💕", "peluk", "kiss", "chu"],
  dramatic: ["kenapa", "why", "hidup", "mati", "sedih", "sad", "😢", "arti", "makna"]
};

/**
 * Deteksi mood dari prompt user berdasarkan keyword.
 * @param {string} prompt
 * @returns {string} salah satu dari MOODS
 */
export function detectMood(prompt) {
  const lower = String(prompt || "").toLowerCase();
  for (const mood of Object.keys(MOOD_KEYWORDS)) {
    if (MOOD_KEYWORDS[mood].some((kw) => lower.includes(kw))) {
      return mood;
    }
  }
  return "neutral";
}

/**
 * RNG deterministik: hash(seed + prompt) → integer.
 * Prompt yang sama + seed yang sama = respons yang sama.
 * (Karena AI serius seharusnya reproducible, kan?)
 */
function deterministicIndex(prompt, seed, modulo) {
  const key = `${seed}::${prompt}`;
  const hash = createHash("sha256").update(key).digest("hex");
  // Ambil 8 hex pertama → 32-bit integer.
  const n = parseInt(hash.slice(0, 8), 16);
  return n % modulo;
}

/**
 * Generate respons chupi.
 * @param {string} prompt - input user (isinya diabaikan, tapi mempengaruhi mood & varian)
 * @param {object} [opts]
 * @param {string|number} [opts.seed] - untuk reproducibility. Default: Date.now() (acak).
 * @param {string} [opts.mood] - paksa mood tertentu. Default: auto-detect.
 * @returns {{ response: string, mood: string, seed: string }}
 */
export function generate(prompt, opts = {}) {
  const mood = opts.mood && MOODS.includes(opts.mood) ? opts.mood : detectMood(prompt);
  const seed = String(opts.seed ?? Date.now());
  const bank = CHUPI_BANK[mood];
  const idx = deterministicIndex(prompt ?? "", seed, bank.length);
  return { response: bank[idx], mood, seed };
}

/** Alias eksplisit dengan mood wajib. */
export function generateWithMood(prompt, mood, opts = {}) {
  return generate(prompt, { ...opts, mood });
}

export default { generate, generateWithMood, detectMood, MOODS, CHUPI_BANK };
