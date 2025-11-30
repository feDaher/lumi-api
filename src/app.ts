import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { env } from './env';
import { errorMiddleware } from './errors/errorMiddleware';
import { logger } from './logger';
import authRoutes from './modules/auth/auth.routes';
import contactRoutes from './modules/contact/contact.routes';
// import usersRoutes from './modules/users/users.routes';
// import tasksRoutes from './modules/tasks/tasks.routes';

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
// app.use('/users', usersRoutes);
// app.use('/tasks', tasksRoutes);

app.use(errorMiddleware);

logger.info('Routes: /health, /auth, /users, /tasks, /contact');

export default app;
