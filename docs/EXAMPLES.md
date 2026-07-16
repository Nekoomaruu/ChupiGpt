# Contoh Penggunaan

## 1. Sebagai library Node.js

```js
import { generate } from "chupigpt";

const { response, mood } = generate("aku sangat senang!");
console.log(response); // → "Phoebe chupi! ✨"
console.log(mood);     // → "happy"

// Deterministik
const a = generate("halo", { seed: 42 });
const b = generate("halo", { seed: 42 });
console.log(a.response === b.response); // → true

// Paksa mood
console.log(generate("apa saja", { mood: "dramatic" }).response);
```

## 2. CLI interaktif

```bash
npm start
# atau
node bin/chupigpt.js
```

```
you » halo
chupigpt » Phoebe chupi.   [mood: neutral]
you » aku ngantuk
chupigpt » phoebe... chupi... zzz   [mood: sleepy]
you » exit
```

## 3. HTTP API

Jalankan server:
```bash
npm run serve
```

### cURL
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"aku cinta chupi","mood":"loving"}'
```

### JavaScript (fetch)
```js
const r = await fetch("http://localhost:5000/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: "halo dunia", seed: 42 })
});
console.log(await r.json());
```

### Python (requests)
```python
import requests
r = requests.post("http://localhost:5000/chat", json={"prompt": "halo"})
print(r.json())
```

## 4. Docker

```bash
docker build -t chupigpt .
docker run -p 5000:5000 chupigpt
```
