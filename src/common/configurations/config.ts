import { config } from "dotenv";
config();

// Validate required environment variables
const requiredEnvVars = ["NODE_ENV", "PORT", "MONGO_DB_URL"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is required`);
  }
}

const configuration = {
  env: process.env.NODE_ENV || "dev",
  port: +(process.env.PORT || 3000),
  mongoDbUrl: process.env.MONGO_DB_URL!,
};

export default configuration;
