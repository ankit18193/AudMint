-- Database Schema for AudMint
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Audits Table
CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tools JSONB NOT NULL,
  total_monthly_savings DECIMAL(10, 2) NOT NULL,
  total_annual_savings DECIMAL(10, 2) NOT NULL,
  recommendations JSONB NOT NULL,
  ai_summary TEXT,
  -- Global Insight metadata
  global_insight_title TEXT,
  global_insight_description TEXT,
  global_insight_savings DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  role VARCHAR(100),
  team_size INT,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  -- Prevent duplicate submissions for same email + audit
  UNIQUE(email, audit_id)
);
