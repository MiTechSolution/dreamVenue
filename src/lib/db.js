import pkg from 'pg';
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // ✅ for Vercel / production
    : false,                        // ❌ no SSL for local dev
});

export default pool;
