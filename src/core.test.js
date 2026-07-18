// Smoke test sederhana — jalankan dengan `npm test`.
import assert from "node:assert/strict";
import { generate, MODEL_IDS, MODELS, MOODS, detectMood } from "./core.js";

// 1. Default model = chupi
const a = generate("halo");
assert.equal(a.model, "chupi");
assert.match(a.response.toLowerCase(), /chupi/);

// 2. Gugugaga model harus bilang gugu/gaga, TIDAK boleh chupi
const b = generate("halo dunia semua", { model: "gugugaga" });
assert.equal(b.model, "gugugaga");
assert.match(b.response.toLowerCase(), /(gugu|gaga)/);
assert.doesNotMatch(b.response.toLowerCase(), /chupi/);

// 3. Determinism per model
const s = { seed: 42 };
assert.equal(generate("test", { ...s, model: "chupi" }).response,
             generate("test", { ...s, model: "chupi" }).response);
assert.equal(generate("test", { ...s, model: "gugugaga" }).response,
             generate("test", { ...s, model: "gugugaga" }).response);

// 4. Panjang output mirror panjang input
const longPrompt = "satu dua tiga empat lima enam tujuh delapan sembilan sepuluh";
const long = generate(longPrompt);
assert.equal(long.length, 10);

// 5. Mood detection
assert.equal(detectMood("aku ngantuk banget"), "sleepy");
assert.equal(detectMood("aku sayang kamu"), "loving");

// 6. Registry sanity
assert.deepEqual(MODEL_IDS.sort(), ["chupi", "gugugaga"]);
assert.ok(MOODS.includes("neutral"));
assert.ok(MODELS.gugugaga.label.includes("Gugugaga"));

console.log("✅ semua test lulus.");
console.log(`   ChupiGpt   → ${a.response}`);
console.log(`   GugugagaGpt→ ${b.response}`);
