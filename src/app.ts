import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { env } from './env';
import { errorMiddleware } from './middlewares/error';
import { logger } from './logger';
import authRoutes from './modules/auth/auth.routes';
// import usersRoutes from './modules/users/users.routes';
// import tasksRoutes from './modules/tasks/tasks.routes';

const app = express();

app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
// app.use('/users', usersRoutes);
// app.use('/tasks', tasksRoutes);

app.use(errorMiddleware);

logger.info('Routes: /health, /auth, /users, /tasks');

export default app;
