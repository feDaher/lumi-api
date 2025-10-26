import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT ?? 3333),
  WEB_ORIGIN: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
};
