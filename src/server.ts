import app from './app';
import { env } from './env';
import { logger } from './logger';

app.listen(env.PORT, () => {
  logger.info(`HTTP server running on http://localhost:${env.PORT}`);
});
