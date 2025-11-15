import express from "express";
const app = express();

import { setupRoutes } from "./routes/v1/index.js";
import {
  registerMiddlewares,
  errorHandler,
  notFound,
} from "./middlewares/index.js";

registerMiddlewares(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

setupRoutes(app);

app.use(notFound);
app.use(errorHandler);

export default app;
