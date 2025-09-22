import { Pool } from "pg";
import { envs } from "./envs";

export const pool = new Pool({
  connectionString: envs.DATABASE_URL, // ej: "postgresql://user:pass@localhost:5432/workhub"
});
