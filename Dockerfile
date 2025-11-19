FROM node:20-alpine

WORKDIR /app

# Copia dependências
COPY package*.json ./
RUN npm ci --include=dev

# Copia TODA a aplicação (inclusive prisma/schema.prisma)
COPY . .

# Gera o Prisma Client DEPOIS de copiar tudo
RUN npx prisma generate

# Build do projeto
RUN npm run build

EXPOSE 3333
CMD ["node", "dist/server.js"]

