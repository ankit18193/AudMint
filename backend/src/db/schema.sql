-- Database Schema for AudMint
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Audits Table
CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY,
  tools JSONB NOT NULL,
  total_monthly_savings DECIMAL(10, 2) NOT NULL,
  total_annual_savings DECIMAL(10, 2) NOT NULL,
  spend_per_member DECIMAL(10, 2) DEFAULT 0,
  recommendations JSONB NOT NULL,
  ai_summary TEXT,
  global_insight_title TEXT,
  global_insight_description TEXT,
  global_insight_savings DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(100),
  team_size INT,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, audit_id)
);

-- Subscriptions Table (for low savings users)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
