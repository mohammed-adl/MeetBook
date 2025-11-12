import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
