// ChupiGpt / GugugagaGpt HTTP API (Express).
// Jalankan: `npm run serve` → listen di PORT (default 5000).

import express from "express";
import { generate, MOODS, MODELS, MODEL_IDS, DEFAULT_MODEL } from "./core.js";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

app.get("/", (_req, res) => {
  res.json({
    name: "OpenNekoAi Parody Suite",
    version: "2.0.0",
    models: MODEL_IDS.map((id) => ({
      id,
      label: MODELS[id].label,
      tagline: MODELS[id].tagline
    })),
    default_model: DEFAULT_MODEL,
    endpoints: ["GET /health", "GET /models", "GET /moods", "POST /chat"]
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Phoebe chupi. Gugu gaga." });
});

app.get("/models", (_req, res) => {
  res.json({
    default: DEFAULT_MODEL,
    models: MODEL_IDS.map((id) => ({
      id,
      label: MODELS[id].label,
      tagline: MODELS[id].tagline
    }))
  });
});

app.get("/moods", (_req, res) => {
  const banks = {};
  for (const id of MODEL_IDS) banks[id] = MODELS[id].bank;
  res.json({ moods: MOODS, banks });
});

// POST /chat
// body: { prompt: string, model?: "chupi"|"gugugaga", seed?, mood? }
app.post("/chat", (req, res) => {
  const { prompt, seed, mood, model } = req.body ?? {};
  if (typeof prompt !== "string") {
    return res.status(400).json({ error: "field 'prompt' (string) wajib." });
  }
  if (model && !MODEL_IDS.includes(model)) {
    return res.status(400).json({ error: `model tidak valid. pilih: ${MODEL_IDS.join(", ")}` });
  }
  if (mood && !MOODS.includes(mood)) {
    return res.status(400).json({ error: `mood tidak valid. pilih: ${MOODS.join(", ")}` });
  }
  const result = generate(prompt, { seed, mood, model });
  res.json(result);
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found. Phoebe chupi. Gugu gaga." });
});

app.listen(PORT, () => {
  console.log(`OpenNekoAi API berjalan di http://localhost:${PORT}`);
  console.log(`Models: ${MODEL_IDS.join(", ")} (default: ${DEFAULT_MODEL})`);
});
