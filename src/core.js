// ChupiGpt / GugugagaGpt — Core Engine
// ---------------------------------------------------------------
// Mesin inferensi ultra-ringan. Tidak ada API. Tidak ada model beneran.
// Hanya dua "model" parodi:
//   - chupi     → ChupiGpt 2.0     ("Phoebe chupi" + variannya)
//   - gugugaga  → GugugagaGpt 2    ("Gugu gaga"    + variannya)
//
// Chupi bukan kucing. Chupi adalah persona chibi Phoebe (Wuthering Waves)
// yang lahir dari meme komunitas. Gugugaga adalah adik pinguin-nya —
// masih Phoebe, tapi dalam mode kigurumi pinguin, cuma bisa bilang "gugu gaga".
// ---------------------------------------------------------------

import { createHash } from "node:crypto";

/* =========================================================
 * MODEL: chupi (ChupiGpt 2.0)
 * ========================================================= */
const CHUPI_BANK = {
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

const CHUPI_FILLERS = {
  neutral: ["phoebe chupi", "chupi", "chupi chupi", "phoebe~", "chupi~", "phoebe chupi chupi", "chu... pi", "chupi.", "phoebe chupi!"],
  happy:   ["phoebe chupi!", "chupi!", "chupiii~", "chupi chupi!", "phoebe~ ✨", "yay chupi!", "chupi chupi chupi!", "phoebe chupi ✨"],
  sleepy:  ["phoebe... chupi", "chu... pi", "chupi zzz", "phoebe~ zzz", "chupi...", "chupiiii~", "phoebe chupi (ngantuk)"],
  angry:   ["CHUPI!", "PHOEBE CHUPI!", "chupi!!", "grrr chupi", "CHUPI CHUPI", "phoebe. chupi.", "CHUPI?!"],
  loving:  ["phoebe chupi 💕", "chupi ❤", "chupi chupi~", "phoebe~ 💕", "chupi sayang~", "chupi chupi ❤", "phoebe chupi (peluk)"],
  dramatic:["...chupi", "phoebe... chupi", "chupi.", "chupi... chupi", "phoebe chupi.", "...phoebe chupi..."]
};

/* =========================================================
 * MODEL: gugugaga (GugugagaGpt 2)
 * ========================================================= */
const GUGU_BANK = {
  neutral: [
    "Gugu gaga.",
    "Gugu... gaga?",
    "Gaga gugu.",
    "Gugu gaga gugu.",
    "Gugu. Gaga."
  ],
  happy: [
    "Gugu gaga! 🐧",
    "GAGAAAA! ✨",
    "Gugu gugu gaga!",
    "Yaay~ gugu gaga!",
    "Gugu gaga gaga! 🎉"
  ],
  sleepy: [
    "gugu... gaga... zzz",
    "gu... ga...",
    "Gugu gaga (ngantuk).",
    "gugaaaa~ *nguap*",
    "gugu gaga zzz zzz"
  ],
  angry: [
    "GUGU GAGA!! 😤",
    "GAGA. GAGA. GAGA!",
    "Grrr... gugu gaga.",
    "Gugu?! GAGA!",
    "Gugu. Gaga. Sekarang."
  ],
  loving: [
    "Gugu gaga 💕",
    "gugu gaga ❤️",
    "Gugu gaga~ (peluk)",
    "gugagaaaa sayang~",
    "Gugu gaga, forever gaga."
  ],
  dramatic: [
    "...gugu... gaga.",
    "Di dunia yang bising ini, hanya ada satu kebenaran: gugu gaga.",
    "Gaga bukan pilihan. Gaga adalah takdir.",
    "Gugu gaga. Titik.",
    "Bahkan pinguin pun berbisik: gaga."
  ]
};

const GUGU_FILLERS = {
  neutral: ["gugu gaga", "gaga", "gugu gugu", "gaga~", "gugu~", "gugu gaga gaga", "gu... ga", "gaga.", "gugu gaga!"],
  happy:   ["gugu gaga!", "gaga!", "gagaaa~", "gugu gaga!", "gugu~ ✨", "yay gaga!", "gaga gaga gaga!", "gugu gaga ✨"],
  sleepy:  ["gugu... gaga", "gu... ga", "gaga zzz", "gugu~ zzz", "gaga...", "gugaaaa~", "gugu gaga (ngantuk)"],
  angry:   ["GAGA!", "GUGU GAGA!", "gaga!!", "grrr gaga", "GUGU GAGA", "gugu. gaga.", "GAGA?!"],
  loving:  ["gugu gaga 💕", "gaga ❤", "gugu gaga~", "gugu~ 💕", "gaga sayang~", "gugu gaga ❤", "gugu gaga (peluk)"],
  dramatic:["...gaga", "gugu... gaga", "gaga.", "gaga... gaga", "gugu gaga.", "...gugu gaga..."]
};

/* =========================================================
 * Registry model
 * ========================================================= */
export const MODELS = {
  chupi: {
    id: "chupi",
    label: "ChupiGpt 2.0",
    tagline: "Cuma bisa bilang 'Phoebe chupi'.",
    bank: CHUPI_BANK,
    fillers: CHUPI_FILLERS,
    farewell: "Phoebe chupi. 👋"
  },
  gugugaga: {
    id: "gugugaga",
    label: "GugugagaGpt 2",
    tagline: "Cuma bisa bilang 'Gugu gaga'.",
    bank: GUGU_BANK,
    fillers: GUGU_FILLERS,
    farewell: "Gugu gaga. 👋"
  }
};

export const MODEL_IDS = Object.keys(MODELS);
export const DEFAULT_MODEL = "chupi";
export const MOODS = Object.keys(CHUPI_BANK); // sama untuk semua model

// Alias legacy — masih diekspor supaya import lama tidak pecah.
export { CHUPI_BANK };

/* =========================================================
 * Mood detection
 * ========================================================= */
const MOOD_KEYWORDS = {
  happy: ["senang", "happy", "hore", "yay", "😊", "😄", "gembira", "asik", "asyik", "wow"],
  sleepy: ["ngantuk", "tidur", "sleep", "capek", "lelah", "malem", "malam", "zzz"],
  angry: ["marah", "kesal", "angry", "bodoh", "goblok", "sial", "!!!", "😡"],
  loving: ["cinta", "sayang", "love", "❤", "💕", "peluk", "kiss", "chu"],
  dramatic: ["kenapa", "why", "hidup", "mati", "sedih", "sad", "😢", "arti", "makna"]
};

export function detectMood(prompt) {
  const lower = String(prompt || "").toLowerCase();
  for (const mood of Object.keys(MOOD_KEYWORDS)) {
    if (MOOD_KEYWORDS[mood].some((kw) => lower.includes(kw))) {
      return mood;
    }
  }
  return "neutral";
}

/* =========================================================
 * Deterministic RNG
 * ========================================================= */
function deterministicIndex(prompt, seed, modulo, salt = 0) {
  const key = `${seed}::${salt}::${prompt}`;
  const hash = createHash("sha256").update(key).digest("hex");
  const n = parseInt(hash.slice(0, 8), 16);
  return n % modulo;
}

function computeCount(prompt) {
  const words = String(prompt || "").trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.min(50, Math.max(1, words));
}

function resolveModel(id) {
  const key = String(id || DEFAULT_MODEL).toLowerCase();
  return MODELS[key] || MODELS[DEFAULT_MODEL];
}

/**
 * Generate respons. Panjang output mengikuti panjang input.
 * @param {string} prompt
 * @param {object} [opts]
 * @param {string} [opts.model]  "chupi" | "gugugaga"
 * @param {string|number} [opts.seed]
 * @param {string} [opts.mood]
 */
export function generate(prompt, opts = {}) {
  const model = resolveModel(opts.model);
  const mood = opts.mood && MOODS.includes(opts.mood) ? opts.mood : detectMood(prompt);
  const seed = String(opts.seed ?? Date.now());
  const bank = model.bank[mood];
  const fillers = model.fillers[mood];

  const count = computeCount(prompt);
  const parts = [];
  parts.push(bank[deterministicIndex(prompt ?? "", seed, bank.length, 0)]);
  for (let i = 1; i < count; i++) {
    const idx = deterministicIndex(prompt ?? "", seed, fillers.length, i);
    parts.push(fillers[idx]);
  }

  return {
    response: parts.join(" "),
    model: model.id,
    mood,
    seed,
    length: count
  };
}

export function generateWithMood(prompt, mood, opts = {}) {
  return generate(prompt, { ...opts, mood });
}

export default { generate, generateWithMood, detectMood, MOODS, MODELS, MODEL_IDS, DEFAULT_MODEL };
