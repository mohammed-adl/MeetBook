import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { logger } from "@lib";

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001;

try {
  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`✅ Server running on http://localhost:${PORT}`);
  });
} catch (err) {
  logger.error("Failed to start server", { err });
  process.exit(1);
}
