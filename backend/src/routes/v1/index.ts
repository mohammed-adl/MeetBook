import authRouter from "./authRouter";
import slotRouter from "./slotRouter";
import providerRouter from "./providerRouter";
import bookingRouter from "./bookingRouter";

export function setupRoutes(app: any) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/slots", slotRouter);
  app.use("/api/v1/providers", providerRouter);
  app.use("/api/v1/bookings", bookingRouter);
}
