type LogLevel = 'INFO' | 'ERROR' | 'WARN';

const sanitize = (data: any): any => {
  if (!data || typeof data !== 'object') return data;
  const sanitized = Array.isArray(data) ? [...data] : { ...data };
  
  // List of sensitive keys to remove
  const sensitiveKeys = ['email', 'password', 'token', 'secret', 'key'];
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitize(sanitized[key]);
    }
  }
  
  return sanitized;
};

import fs from 'fs';
import path from 'path';

const logFile = path.resolve(__dirname, '../../../app.log');

export const logger = {
  logInfo: (message: string, meta?: any) => {
    const log = `[INFO] ${new Date().toISOString()} - ${message} ${meta ? JSON.stringify(sanitize(meta)) : ''}\n`;
    console.log(log);
    fs.appendFileSync(logFile, log);
  },
  logWarn: (message: string, meta?: any) => {
    const log = `[WARN] ${new Date().toISOString()} - ${message} ${meta ? JSON.stringify(sanitize(meta)) : ''}\n`;
    console.warn(log);
    fs.appendFileSync(logFile, log);
  },
  logError: (message: string, meta?: any) => {
    const log = `[ERROR] ${new Date().toISOString()} - ${message} ${meta ? JSON.stringify(sanitize(meta)) : ''}\n`;
    console.error(log);
    fs.appendFileSync(logFile, log);
  }
};
