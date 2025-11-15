import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "../../middlewares/index.js";
import { createSlotSchema, usernameParamSchema } from "../../schemas/index.js";
import * as slotController from "../../controllers/slot/index.js";

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
