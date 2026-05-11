import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validates and centralizes environment variables.
 * Throws an error if required variables are missing.
 */
function getEnv(key: string, required = true, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (required && !value) {
    throw new Error(`Environment variable ${key} is missing!`);
  }
  
  return value || '';
}

export const config = {
  // Server
  port: parseInt(getEnv('PORT', false, '3001')),
  nodeEnv: getEnv('NODE_ENV', false, 'development'),
  frontendUrl: getEnv('FRONTEND_URL', false, 'http://localhost:3000'),

  // Database
  databaseUrl: getEnv('DATABASE_URL', false), // PostgreSQL URL (optional fallback to db.json exists)

  // AI
  anthropicApiKey: getEnv('ANTHROPIC_API_KEY', false),
  openaiApiKey: getEnv('OPENAI_API_KEY', false),

  // Email (SMTP)
  email: {
    from: getEnv('EMAIL_FROM', false, '"AudMint" <no-reply@audmint.com>'),
    smtpHost: getEnv('SMTP_HOST', false, 'smtp.resend.com'),
    smtpPort: parseInt(getEnv('SMTP_PORT', false, '465')),
    smtpSecure: getEnv('SMTP_SECURE', false, 'true') !== 'false',
    smtpUser: getEnv('SMTP_USER', false, 'resend'),
    smtpPass: getEnv('SMTP_PASS', false) || getEnv('EMAIL_API_KEY', false),
  }
};
