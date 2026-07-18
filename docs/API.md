# OpenNekoAi Parody Suite — API Reference

Base URL: `http://localhost:5000`
Semua respons berformat JSON.

## Models

| ID          | Label            | Output          |
|-------------|------------------|-----------------|
| `chupi`     | ChupiGpt 2.0     | "Phoebe chupi"  |
| `gugugaga`  | GugugagaGpt 2    | "Gugu gaga"     |

Default model: `chupi`.

---

## GET `/`
Info dasar service + daftar model.

## GET `/health`
Health check.
```json
{ "status": "ok", "message": "Phoebe chupi. Gugu gaga." }
```

## GET `/models`
Daftar model yang tersedia.
```json
{
  "default": "chupi",
  "models": [
    { "id": "chupi",    "label": "ChupiGpt 2.0",  "tagline": "..." },
    { "id": "gugugaga", "label": "GugugagaGpt 2", "tagline": "..." }
  ]
}
```

## GET `/moods`
Daftar mood + bank respons per model.

## POST `/chat`
Endpoint utama.

**Request body**
| Field  | Type              | Required | Deskripsi |
|--------|-------------------|----------|-----------|
| prompt | string            | ✅       | Input dari user. Panjangnya menentukan panjang output. |
| model  | string            | ❌       | `chupi` (default) atau `gugugaga`. |
| seed   | string \| number  | ❌       | Reproducibility. Model + prompt + seed sama → output identik. |
| mood   | string            | ❌       | Paksa mood: `neutral`, `happy`, `sleepy`, `angry`, `loving`, `dramatic`. |

**Response 200**
```json
{
  "response": "Gugu gaga! 🐧 gugu gaga gaga gugu~ ✨",
  "model": "gugugaga",
  "mood": "happy",
  "seed": "42",
  "length": 5
}
```

### cURL — ChupiGpt
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "halo dunia", "model": "chupi", "seed": 42}'
```

### cURL — GugugagaGpt
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "halo dunia", "model": "gugugaga", "seed": 42}'
```
