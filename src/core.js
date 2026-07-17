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
 * Bank respons "chupi" utama, dikelompokkan berdasarkan mood.
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

/**
 * Fragment pendek "chupi" untuk mengisi respons panjang.
 * Dipilih berulang saat input user panjang → output ikut memanjang.
 */
const CHUPI_FILLERS = {
  neutral: ["phoebe chupi", "chupi", "chupi chupi", "phoebe~", "chupi~", "phoebe chupi chupi", "chu... pi", "chupi.", "phoebe chupi!"],
  happy:   ["phoebe chupi!", "chupi!", "chupiii~", "chupi chupi!", "phoebe~ ✨", "yay chupi!", "chupi chupi chupi!", "phoebe chupi ✨"],
  sleepy:  ["phoebe... chupi", "chu... pi", "chupi zzz", "phoebe~ zzz", "chupi...", "chupiiii~", "phoebe chupi (ngantuk)"],
  angry:   ["CHUPI!", "PHOEBE CHUPI!", "chupi!!", "grrr chupi", "CHUPI CHUPI", "phoebe. chupi.", "CHUPI?!"],
  loving:  ["phoebe chupi 💕", "chupi ❤", "chupi chupi~", "phoebe~ 💕", "chupi sayang~", "chupi chupi ❤", "phoebe chupi (peluk)"],
  dramatic:["...chupi", "phoebe... chupi", "chupi.", "chupi... chupi", "phoebe chupi.", "...phoebe chupi..."]
};

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
 * RNG deterministik: hash(seed + prompt + salt) → integer.
 * Prompt yang sama + seed yang sama = respons yang sama.
 */
function deterministicIndex(prompt, seed, modulo, salt = 0) {
  const key = `${seed}::${salt}::${prompt}`;
  const hash = createHash("sha256").update(key).digest("hex");
  const n = parseInt(hash.slice(0, 8), 16);
  return n % modulo;
}

/**
 * Hitung berapa banyak "chupi" untuk output.
 * Semakin panjang input user, semakin panjang output — mirror agresif, cap 50.
 */
function computeChupiCount(prompt) {
  const words = String(prompt || "").trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.min(50, Math.max(1, words));
}

/**
 * Generate respons chupi. Panjang output mengikuti panjang input.
 * @param {string} prompt
 * @param {object} [opts]
 * @param {string|number} [opts.seed]
 * @param {string} [opts.mood]
 * @returns {{ response: string, mood: string, seed: string, length: number }}
 */
export function generate(prompt, opts = {}) {
  const mood = opts.mood && MOODS.includes(opts.mood) ? opts.mood : detectMood(prompt);
  const seed = String(opts.seed ?? Date.now());
  const bank = CHUPI_BANK[mood];
  const fillers = CHUPI_FILLERS[mood];

  const count = computeChupiCount(prompt);
  const parts = [];

  // Bagian pertama: varian utama dari bank (kalimat "besar").
  parts.push(bank[deterministicIndex(prompt ?? "", seed, bank.length, 0)]);

  // Sisanya: fragment pendek, dipilih deterministik tapi bervariasi tiap slot.
  for (let i = 1; i < count; i++) {
    const idx = deterministicIndex(prompt ?? "", seed, fillers.length, i);
    parts.push(fillers[idx]);
  }

  const response = parts.join(" ");
  return { response, mood, seed, length: count };
}

/** Alias eksplisit dengan mood wajib. */
export function generateWithMood(prompt, mood, opts = {}) {
  return generate(prompt, { ...opts, mood });
}

export default { generate, generateWithMood, detectMood, MOODS, CHUPI_BANK };
