import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  encoding: "utf-8",
  debug: true,
  override: false,
});

export const environmentVariables = {
  PORT: !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3001,
  PG_HOST: process.env.PG_HOST || "localhost",
  PG_PORT: !isNaN(Number(process.env.PG_PORT))
    ? Number(process.env.PG_PORT)
    : 5432,
  PG_USERNAME: process.env.PG_USERNAME || "",
  PG_PASSWORD: process.env.PG_PASSWORD || "",
  PG_DATABASE: process.env.PG_DATABASE || "library-app",
  PG_TEST_DATABASE: process.env.PG_TEST_DATABASE || "library-app-test",
} as const;
