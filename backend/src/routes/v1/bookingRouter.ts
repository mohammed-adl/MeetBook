import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "../../middlewares/index.js";
import { createBookingSchema } from "../../schemas/index.js";

import * as bookingController from "../../controllers/booking/index.js";

router.post(
  "/",
  validateToken,
  validateReq({ body: createBookingSchema }),
  bookingController.createBooking
);

export default router;
