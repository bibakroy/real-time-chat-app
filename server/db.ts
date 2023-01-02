import { Pool } from "pg";

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: parseInt(process.env.DATABASE_ORT!),
});

export default pool;
