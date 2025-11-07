# Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3336

CMD ["npm", "start"]