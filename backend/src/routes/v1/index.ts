import authRouter from "./authRouter";

export function setupRoutes(app: any) {
  app.use("/api/v1/auth", authRouter);
}
