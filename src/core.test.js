// Test super sederhana. Jalankan: `npm test`.
import assert from "node:assert/strict";
import { generate, detectMood, MOODS, CHUPI_BANK } from "./core.js";

// 1. Determinisme: seed + prompt sama → output sama.
const a = generate("halo dunia", { seed: 42 });
const b = generate("halo dunia", { seed: 42 });
assert.equal(a.response, b.response, "output harus deterministik untuk seed sama");

// 2. Mood detection.
assert.equal(detectMood("aku sangat senang hari ini"), "happy");
assert.equal(detectMood("aku ngantuk banget"), "sleepy");
assert.equal(detectMood("kenapa hidup begini"), "dramatic");
assert.equal(detectMood("halo"), "neutral");

// 3. Semua mood punya minimal 3 varian.
for (const m of MOODS) {
  assert.ok(CHUPI_BANK[m].length >= 3, `mood ${m} kurang varian`);
}

// 4. Response selalu mengandung "chupi" (case-insensitive).
for (let i = 0; i < 50; i++) {
  const { response } = generate(`prompt-${i}`, { seed: i });
  assert.ok(/chupi/i.test(response), `respons tanpa 'chupi': ${response}`);
}

console.log("✓ Semua test lulus. Phoebe chupi.");
