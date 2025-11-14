import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as slotController from "@controllers/slot";

router.get("/provider/slots", validateToken, slotController.getProviderSlots);
router.get("/stats", validateToken, slotController.getProviderSlots);

export default router;
