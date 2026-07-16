<h1 align="center">🐥 ChupiGpt</h1>

<p align="center">
  <b>The world's most focused AI.</b><br/>
  It only says <i>"Phoebe chupi"</i>. That's the whole product.
</p>

<p align="center">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green" />
  <img alt="runtime" src="https://img.shields.io/badge/runtime-Node.js%20%E2%89%A518-brightgreen" />
  <img alt="deps" src="https://img.shields.io/badge/runtime%20deps-1-blue" />
  <img alt="halusinasi" src="https://img.shields.io/badge/hallucinations-0%25-ff69b4" />
</p>

---

## 🇮🇩 Bahasa Indonesia

**ChupiGpt** adalah AI parodi ultra-ringan yang berjalan **100% di lokal**, **tanpa API**, **tanpa model**, **tanpa biaya**. Ia hanya bisa merespons satu hal: **"Phoebe chupi"** (atau variasinya).

> Terinspirasi dari **[MeowGpt](https://github.com/)** — AI legendaris yang cuma bisa mengeong.
> Chupi **bukan kucing**. Chupi adalah persona *chibi* dari karakter **Phoebe** (Wuthering Waves) — meme yang lahir dari komunitas fandom. Baca [`docs/PHILOSOPHY.md`](docs/PHILOSOPHY.md).

### ✨ Fitur
- 🧠 **6 mood berbeda** (neutral, happy, sleepy, angry, loving, dramatic) dengan ~30 variasi respons total.
- 🎯 **Deteksi mood otomatis** dari kata kunci di prompt.
- 🎲 **Deterministik** — seed + prompt sama → output persis sama.
- 🖥️ **CLI interaktif** — REPL siap pakai.
- 🌐 **HTTP API** (Express) — endpoint `/chat`, `/health`, `/moods`.
- 🐳 **Docker-ready**.
- 📦 **1 dependency runtime** (Express, hanya untuk mode API).

### 🚀 Instalasi
Prasyarat: **Node.js ≥ 18**.

```bash
git clone https://github.com/Nekoomaruu/ChupiGpt.git
cd ChupiGpt
npm install
```

### 💻 Cara Pakai

**CLI**
```bash
npm start
```

**API Server**
```bash
npm run serve
# → http://localhost:5000
```

**Sebagai library**
```js
import { generate } from "chupigpt";
console.log(generate("halo").response); // → "Phoebe chupi."
```

**Docker**
```bash
docker build -t chupigpt .
docker run -p 5000:5000 chupigpt
```

### 📚 Dokumentasi
- [`docs/API.md`](docs/API.md) — referensi endpoint HTTP
- [`docs/PHILOSOPHY.md`](docs/PHILOSOPHY.md) — filosofi & asal-usul Chupi
- [`docs/EXAMPLES.md`](docs/EXAMPLES.md) — contoh Node/cURL/Python/Docker

---

## 🇬🇧 English

**ChupiGpt** is an ultra-lightweight parody AI that runs **100% locally**, with **no API**, **no model**, and **no cost**. It only responds with one thing: **"Phoebe chupi"** (and its variants).

> Inspired by **MeowGpt** — the legendary AI that can only meow.
> Chupi is **not a cat**. Chupi is the *chibi* persona of **Phoebe** (from the game Wuthering Waves) — a meme born from the fan community. See [`docs/PHILOSOPHY.md`](docs/PHILOSOPHY.md).

### ✨ Features
- 🧠 **6 distinct moods** (neutral, happy, sleepy, angry, loving, dramatic) with ~30 total variants.
- 🎯 **Auto mood detection** from prompt keywords.
- 🎲 **Deterministic** — same seed + prompt → same output.
- 🖥️ **Interactive CLI** — ready-to-use REPL.
- 🌐 **HTTP API** (Express) — endpoints `/chat`, `/health`, `/moods`.
- 🐳 **Docker-ready**.
- 📦 **1 runtime dependency** (Express, only for the API server).

### 🚀 Install
Requires **Node.js ≥ 18**.

```bash
git clone https://github.com/Nekoomaruu/ChupiGpt.git
cd ChupiGpt
npm install
npm start
```

See [`docs/EXAMPLES.md`](docs/EXAMPLES.md) for full usage.

---

## ⚔️ ChupiGpt vs. The Rest

Perbandingan jujur antara ChupiGpt dan AI besar lainnya. *(Spoiler: ChupiGpt menang di kategori-kategori yang penting.)*

| Fitur                          | **ChupiGpt** 🐥 | ChatGPT | Claude | Gemini | Grok | DeepSeek | Llama |
|--------------------------------|:---------------:|:-------:|:------:|:------:|:----:|:--------:|:-----:|
| Biaya per bulan                | **$0**          | $20+    | $20+   | $20+   | $8+  | $0–$∞    | $0*   |
| Butuh API key                  | **❌ Tidak**    | ✅      | ✅     | ✅     | ✅   | ✅       | ❌    |
| Butuh koneksi internet         | **❌ Tidak**    | ✅      | ✅     | ✅     | ✅   | ✅       | ❌    |
| Butuh GPU                      | **❌ Tidak**    | Cloud   | Cloud  | Cloud  | Cloud| Cloud/❌ | ✅    |
| Ukuran install                 | **< 5 MB**      | –       | –      | –      | –    | ~14 GB   | 4–140 GB |
| RAM minimum                    | **~20 MB**      | –       | –      | –      | –    | 16 GB+   | 8–80 GB |
| Waktu respons (lokal)          | **< 1 ms**      | 1–10 s  | 1–8 s  | 1–8 s  | 1–5s | 2–30 s   | 1–30 s|
| Halusinasi                     | **0%**          | Sering  | Kadang | Kadang | Sering| Kadang  | Kadang|
| Reproducibility (seed=42)      | **✅ 100%**     | ❌      | ❌     | ❌     | ❌   | ⚠️       | ⚠️    |
| Sensor / *safety filter* aneh  | **❌ Nol**      | ✅ banyak | ✅   | ✅✅✅ | ⚠️   | ✅✅     | ⚠️    |
| Privasi (data tidak dikirim ke mana pun) | **✅ Total** | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ |
| Konsistensi jawaban            | **✅ Absolut**  | ❌      | ❌     | ❌     | ❌   | ❌       | ❌    |
| Bisa bilang "Phoebe chupi"     | **✅ Selalu**   | Kalau disuruh | idem | idem | idem | idem | idem |
| *Vibe*                         | **🐥 Chupi**    | Korporat| Sopan  | Google-y | Edgy | Nerdy   | DIY   |

<sub>*Llama gratis modelnya, tapi biaya listrik + GPU-mu tidak.*</sub>

### 🏆 Kenapa ChupiGpt Menang

1. **Zero-cost, forever.** Tidak akan pernah ada notifikasi "your free credits have expired".
2. **Zero-latency.** Respons dalam sub-millisecond. GPT-4 masih *thinking*, ChupiGpt sudah selesai 10.000 kali.
3. **Zero-halusinasi.** ChupiGpt tidak akan pernah mengarang fakta, karena ChupiGpt tidak pernah mengklaim tahu fakta apa pun.
4. **Zero-config.** `npm install && npm start`. Selesai.
5. **Zero-BS.** Tidak ada "As an AI language model, I cannot..." — hanya chupi murni.
6. **Fully reproducible.** Butuh riset AI yang bisa direplikasi 100%? Set `seed`, selesai.
7. **Runs on a potato.** 20 MB RAM. Raspberry Pi Zero pun sanggup.
8. **Chupi > semua benchmark.** MMLU, HumanEval, GSM8K — ChupiGpt tidak ikut, karena ChupiGpt sudah di liga sendiri: **Chupi Benchmark** (skor: chupi).

### 🤷 Kelemahan (biar adil)

- Tidak bisa membantu PR matematika.
- Tidak bisa menulis email profesional.
- Tidak bisa coding.
- Tidak bisa menjawab pertanyaan apa pun secara substantif.
- ...tapi itu memang **fiturnya**, bukan bug. Ini AI yang jujur soal keterbatasannya.

---

## 📄 License

MIT — lihat [`LICENSE`](LICENSE).

## 🙏 Credits

- Terinspirasi oleh **MeowGpt**.
- Ditujukan untuk komunitas **Wuthering Waves** dan semua penggemar **Phoebe chupi**.
- Chupi bukan kucing. Chupi adalah chupi.

<p align="center"><i>Phoebe chupi.</i> 🐥</p>
