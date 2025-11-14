import authRouter from "./authRouter";
import slotRouter from "./slotRouter";

export function setupRoutes(app: any) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/slot", slotRouter);
}
