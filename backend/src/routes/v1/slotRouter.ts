import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";
import * as slotController from "@controllers/slot";

router.use(validateToken);

router.get("/stats", slotController.getProviderSlotsStats);
router.get("/all/available", slotController.getAllAvailableSlots);
router.post("/", slotController.createSlot);
router.get("/:username", slotController.getProviderSlots);

export default router;
