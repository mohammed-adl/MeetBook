import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "@middlewares";
import { createSlotSchema, usernameParamSchema } from "@schemas";
import * as slotController from "@controllers/slot";

router.use(validateToken);

router.get("/stats", slotController.getProviderSlotsStats);
router.get("/all/available", slotController.getAllAvailableSlots);
router.post(
  "/",
  validateReq({ body: createSlotSchema }),
  slotController.createSlot
);
router.get(
  "/:username",
  validateReq({ params: usernameParamSchema }),
  slotController.getProviderSlots
);

export default router;
