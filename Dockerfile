FROM node:20-alpine

WORKDIR /app

# Copia dependências
COPY package*.json ./
RUN npm ci --include=dev

COPY prisma ./prisma
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["node", "dist/server.js"]
