import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import auditRouter from './api/audit';
import leadRouter from './api/lead';
import reportRouter from './api/report';
import subscribeRouter from './api/subscribe';

dotenv.config();

const app = express();

// Basic security and parsing
app.use(cors());
app.use(express.json());

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." }
});
app.use(limiter);

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AudMint Backend running on port ${PORT}`);
});

// Keep process alive if database connection is slow or failing
setInterval(() => {}, 60000);
