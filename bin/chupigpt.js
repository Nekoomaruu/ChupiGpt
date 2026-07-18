#!/usr/bin/env node
// ChupiGpt / GugugagaGpt CLI — REPL interaktif dengan pilihan model.
// Jalankan: `npm start` atau `node bin/chupigpt.js`
//
// Flag opsional:
//   --model=chupi        langsung pakai ChupiGpt 2.0 (skip menu)
//   --model=gugugaga     langsung pakai GugugagaGpt 2 (skip menu)

import readline from "node:readline";
import { generate, MODELS, MODEL_IDS, DEFAULT_MODEL } from "../src/core.js";

const BANNER = `
╔══════════════════════════════════════════════════╗
║   OpenNekoAi  —  Local Parody LLM Suite          ║
║   Zero API. Zero Cost. Zero Effort.              ║
║   Ketik 'exit' atau tekan Ctrl-C untuk keluar.   ║
╚══════════════════════════════════════════════════╝
`;

function parseFlag(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function printMenu() {
  console.log("Pilih model:");
  MODEL_IDS.forEach((id, i) => {
    const m = MODELS[id];
    console.log(`  ${i + 1}) ${m.label.padEnd(16)} — ${m.tagline}`);
  });
  console.log("");
}

function resolveChoice(input) {
  const raw = String(input || "").trim().toLowerCase();
  if (!raw) return DEFAULT_MODEL;
  // by number
  const n = Number(raw);
  if (!Number.isNaN(n) && n >= 1 && n <= MODEL_IDS.length) {
    return MODEL_IDS[n - 1];
  }
  // by id / label prefix
  for (const id of MODEL_IDS) {
    if (id.startsWith(raw)) return id;
    if (MODELS[id].label.toLowerCase().startsWith(raw)) return id;
  }
  return null;
}

async function pickModel(rl) {
  const preset = parseFlag("model");
  if (preset) {
    const resolved = resolveChoice(preset);
    if (resolved) return resolved;
    console.log(`Model "${preset}" tidak dikenal. Lanjut ke menu.\n`);
  }

  printMenu();

  return new Promise((resolve) => {
    const ask = () => {
      rl.question(`Pilih [1-${MODEL_IDS.length}] (default 1): `, (ans) => {
        const choice = resolveChoice(ans);
        if (choice) return resolve(choice);
        console.log("Pilihan tidak valid. Coba lagi.\n");
        ask();
      });
    };
    ask();
  });
}

async function main() {
  console.log(BANNER);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const modelId = await pickModel(rl);
  const model = MODELS[modelId];

  console.log(`\n✔ Model aktif: ${model.label}`);
  console.log(`  ${model.tagline}\n`);

  rl.setPrompt("you » ");
  rl.prompt();

  rl.on("line", (line) => {
    const input = line.trim();
    if (!input) return rl.prompt();

    const cmd = input.toLowerCase();
    if (["exit", "quit", ":q"].includes(cmd)) {
      console.log(`${model.label.toLowerCase()} » ${model.farewell}`);
      rl.close();
      return;
    }
    if (cmd === "/models" || cmd === ":models") {
      printMenu();
      return rl.prompt();
    }

    const { response } = generate(input, { model: modelId });
    console.log(`${model.label.toLowerCase()} » ${response}`);
    rl.prompt();
  });

  rl.on("close", () => process.exit(0));
}

main();
