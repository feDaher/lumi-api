This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
Node.js 18+ e npm

Docker Desktop (Windows/macOS) ou Docker Engine (Linux)

Git

(Opcional) DBeaver para visualizar o banco

(Opcional) Prisma Studio (via CLI)
```

## Clonar o projeto

git clone <url-do-seu-repo> lumi-api
cd lumi-api

## Instalação

npm install

Se você ainda não tiver adicionado, instale também:

```bash
npm i -D tsx
```

## Docker (suba o banco):

docker compose up -d
docker ps   # deve listar o container lumi_pg

OBS: Se a porta 5432 já estiver em uso, troque a linha para "5433:5432" e use 5433 na DATABASE_URL.

## Inicie o projeto

npm run dev