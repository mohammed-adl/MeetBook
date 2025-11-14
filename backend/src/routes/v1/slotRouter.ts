import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as slotController from "@controllers/slot";

router.get("/stats", validateToken, slotController.getProviderSlotsStats);

router.post("/", validateToken, slotController.createSlot);

router.get("/:username", validateToken, slotController.getProviderSlots);

export default router;
