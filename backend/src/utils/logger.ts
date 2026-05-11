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

const print = (level: LogLevel, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` ${JSON.stringify(sanitize(meta))}` : '';
  console.log(`[${level}] ${timestamp} - ${message}${metaString}`);
};

export const logger = {
  logInfo(message: string, meta?: any) {
    print('INFO', message, meta);
  },

  logError(message: string, meta?: any) {
    print('ERROR', message, meta);
  },

  logWarn(message: string, meta?: any) {
    print('WARN', message, meta);
  }
};
