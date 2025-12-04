-- Initial schema for payments and uploads
-- Run this as the first migration to create required tables

BEGIN;

-- Payments table: one row per Stripe checkout session
CREATE TABLE IF NOT EXISTS payments (
  session_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  amount INT,
  currency VARCHAR(8),
  status VARCHAR(32) DEFAULT 'paid',
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  uploaded_at TIMESTAMP WITH TIME ZONE,
  report_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Uploads table: track each upload attempt and result
CREATE TABLE IF NOT EXISTS uploads (
  id TEXT PRIMARY KEY,
  session_id TEXT REFERENCES payments(session_id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_size INT NOT NULL,
  status VARCHAR(32) DEFAULT 'processing',
  error TEXT,
  text_length INT,
  pdf_confidence INT,
  analysis_pages INT,
  action_items INT,
  email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_uploads_session_id ON uploads(session_id);

COMMIT;
