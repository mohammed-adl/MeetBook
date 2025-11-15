import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "@middlewares";
import { createBookingSchema } from "@schemas";

import * as bookingController from "@controllers/booking";

router.post(
  "/",
  validateToken,
  validateReq({ body: createBookingSchema }),
  bookingController.createBooking
);

export default router;
