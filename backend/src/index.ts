import express from 'express';
import cors from 'cors';
import auditRouter from './api/audit';
import leadRouter from './api/lead';
import reportRouter from './api/report';
import subscribeRouter from './api/subscribe';
import { logger } from './utils/logger';
import { config } from './config/env';

const app = express();
logger.logInfo('AudMint Backend starting up...');

// Basic security and parsing
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/audit', auditRouter);
app.use('/api/lead', leadRouter);
app.use('/api/report', reportRouter);
app.use('/api/subscribe', subscribeRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

const PORT = config.port;
app.listen(PORT, () => {
  logger.logInfo(`AudMint Backend running on port ${PORT}`);
});

// Keep process alive if database connection is slow or failing
setInterval(() => {}, 60000);
