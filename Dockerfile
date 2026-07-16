# ChupiGpt — Docker image (Node.js runtime)
# Menjalankan Express API di port 5000.
FROM node:20-alpine

WORKDIR /app

# Install dependencies terlebih dahulu (cache-friendly)
COPY package.json ./
RUN npm install --omit=dev

# Salin source
COPY src ./src
COPY bin ./bin

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["node", "src/server.js"]
