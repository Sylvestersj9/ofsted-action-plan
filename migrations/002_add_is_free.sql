-- Add is_free flag to uploads to record free reports
BEGIN;

ALTER TABLE IF EXISTS uploads
  ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE;

COMMIT;
