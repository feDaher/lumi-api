import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  // WEB_ORIGIN: process.env.WEB_ORIGIN ?? 'http://localhost:5173', caso ativar o web - front
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
};
