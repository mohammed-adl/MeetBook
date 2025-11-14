import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as slotController from "@controllers/slot";

router.get("/stats", validateToken, slotController.getSlotsStats);

export default router;
