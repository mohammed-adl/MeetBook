import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "@middlewares";

import * as providerController from "@controllers/provider";

router.get("/:username", validateToken, providerController.getProvider);

export default router;
