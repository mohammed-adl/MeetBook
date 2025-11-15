import express from "express";
const router = express.Router();

import { validateToken, validateReq } from "../../middlewares/index.js";

import * as providerController from "../../controllers/provider/index.js";

router.get("/:username", validateToken, providerController.getProvider);

export default router;
