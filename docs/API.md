# ChupiGpt API Reference

Base URL: `http://localhost:5000`

Semua respons berformat JSON.

## GET `/`
Info dasar service.

**Response 200**
```json
{
  "name": "ChupiGpt",
  "version": "1.0.0",
  "tagline": "The AI that only says 'Phoebe chupi'.",
  "endpoints": ["GET /health", "GET /moods", "POST /chat"]
}
```

## GET `/health`
Health check.

**Response 200**
```json
{ "status": "ok", "message": "Phoebe chupi." }
```

## GET `/moods`
Daftar mood yang tersedia beserta bank respons-nya.

**Response 200**
```json
{
  "moods": ["neutral", "happy", "sleepy", "angry", "loving", "dramatic"],
  "bank": { "neutral": ["Phoebe chupi.", "..."], "...": [] }
}
```

## POST `/chat`
Endpoint utama. Kirim prompt apa saja, dapatkan "chupi".

**Request body**
| Field  | Type              | Required | Deskripsi |
|--------|-------------------|----------|-----------|
| prompt | string            | ✅       | Input dari user. Isinya secara teknis diabaikan — hanya digunakan untuk deteksi mood + seeding varian. |
| seed   | string \| number  | ❌       | Untuk reproducibility. Prompt + seed sama → output identik. |
| mood   | string            | ❌       | Paksa mood tertentu. Nilai valid: `neutral`, `happy`, `sleepy`, `angry`, `loving`, `dramatic`. |

**Response 200**
```json
{
  "response": "Phoebe chupi! ✨",
  "mood": "happy",
  "seed": "1737000000000"
}
```

**Response 400** — prompt hilang / mood invalid.

### cURL
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "halo dunia", "seed": 42}'
```
