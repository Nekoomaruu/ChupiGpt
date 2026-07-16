// ChupiGpt HTTP API (Express).
// Jalankan: `npm run serve` → listen di PORT (default 5000).

import express from "express";
import { generate, MOODS, CHUPI_BANK } from "./core.js";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

// GET / — info dasar.
app.get("/", (_req, res) => {
  res.json({
    name: "ChupiGpt",
    version: "1.0.0",
    tagline: "The AI that only says 'Phoebe chupi'.",
    endpoints: ["GET /health", "GET /moods", "POST /chat"]
  });
});

// GET /health — health check.
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Phoebe chupi." });
});

// GET /moods — daftar mood + varian.
app.get("/moods", (_req, res) => {
  res.json({ moods: MOODS, bank: CHUPI_BANK });
});

// POST /chat — endpoint utama.
// body: { prompt: string, seed?: string|number, mood?: string }
app.post("/chat", (req, res) => {
  const { prompt, seed, mood } = req.body ?? {};
  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "field 'prompt' (string) wajib." });
  }
  if (mood && !MOODS.includes(mood)) {
    return res.status(400).json({ error: `mood tidak valid. pilih salah satu: ${MOODS.join(", ")}` });
  }
  const result = generate(prompt, { seed, mood });
  res.json(result);
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found. Phoebe chupi." });
});

app.listen(PORT, () => {
  console.log(`ChupiGpt API berjalan di http://localhost:${PORT}`);
});
