import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger';

/**
 * Standard Limiter: 100 requests per 15 minutes
 * Used for general data fetching (e.g., Reports)
 */
export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },
  handler: (req, res, _next, options) => {
    logger.logWarn('Rate limit hit (Standard)', { ip: req.ip, path: req.path });
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict Limiter: 10 requests per 1 minute
 * Used for critical write operations (Audits, Leads, Subscriptions)
 */
export const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },
  handler: (req, res, _next, options) => {
    logger.logWarn('Rate limit hit (Strict)', { ip: req.ip, path: req.path });
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
