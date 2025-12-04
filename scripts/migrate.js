#!/usr/bin/env node
/**
 * Simple migration runner for Postgres using `pg`.
 *
 * Usage:
 *   DATABASE_URL="postgres://user:pass@host:5432/db" node scripts/migrate.js
 * or
 *   npm run migrate
 *
 * The script creates a `migrations` table and applies any SQL files
 * found in the `migrations/` folder in lexicographic order.
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.log('DATABASE_URL not set. Skipping migrations. Set DATABASE_URL to run migrations.');
    process.exit(0);
  }

  let Pool;
  try {
    ({ Pool } = require('pg'));
  } catch (err) {
    console.error('pg package not found. Please run `npm install pg`');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: databaseUrl });

  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    const migrationsDir = path.join(__dirname, '..', 'migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const name = file;
      const { rows } = await client.query('SELECT 1 FROM migrations WHERE name=$1', [name]);
      if (rows.length > 0) {
        console.log(`Skipping ${name} (already applied)`);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`Applying migration: ${name}`);
      try {
        await client.query(sql);
        await client.query('INSERT INTO migrations(name) VALUES($1)', [name]);
        console.log(`Applied: ${name}`);
      } catch (err) {
        console.error(`Failed to apply ${name}:`, err.message || err);
        throw err;
      }
    }

    console.log('All migrations applied');
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
