import express from "express";
const router = express.Router();

import { validateToken } from "@middlewares";

import * as providerController from "@controllers/provider";

router.get("/stats", validateToken, providerController.getProvider);

export default router;
