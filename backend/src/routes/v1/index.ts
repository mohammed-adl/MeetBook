import authRouter from "./authRouter.js";
import slotRouter from "./slotRouter.js";
import providerRouter from "./providerRouter.js";
import bookingRouter from "./bookingRouter.js";

export function setupRoutes(app: any) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/slots", slotRouter);
  app.use("/api/v1/providers", providerRouter);
  app.use("/api/v1/bookings", bookingRouter);
}
