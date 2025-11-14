import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as providerController from "@controllers/provider";

router.get("/:username", validateToken, providerController.getProvider);
router.get(
  "/:username/slots",
  validateToken,
  providerController.getProviderSlots
);

export default router;
