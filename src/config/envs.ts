import "dotenv/config";
import { get } from "env-var";

export const envs = {
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  PORT: get("PORT").required().asPortNumber(),
};
