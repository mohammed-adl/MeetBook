import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as bookingController from "@controllers/booking";

router.post("/", validateToken, bookingController.createBooking);

export default router;
