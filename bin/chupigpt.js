#!/usr/bin/env node
// ChupiGpt CLI — REPL interaktif.
// Jalankan: `node bin/chupigpt.js` atau `npm start`.

import readline from "node:readline";
import { generate } from "../src/core.js";

const BANNER = `
╔══════════════════════════════════════════╗
║        ChupiGpt v1.0 — CLI               ║
║   Zero API. Zero Cost. Zero Effort.      ║
║   Ketik 'exit' atau tekan Ctrl-C.        ║
╚══════════════════════════════════════════╝
`;

console.log(BANNER);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "you » "
});

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  if (!input) return rl.prompt();
  if (["exit", "quit", ":q"].includes(input.toLowerCase())) {
    console.log("chupigpt » Phoebe chupi. 👋");
    rl.close();
    return;
  }
  const { response, mood } = generate(input);
  console.log(`chupigpt » ${response}   \x1b[90m[mood: ${mood}]\x1b[0m`);
  rl.prompt();
});

rl.on("close", () => {
  process.exit(0);
});
