import express from "express";
const router = express.Router();

import { authLimiter } from "@middlewares";

import * as authController from "@controllers/auth";

router.post("/refresh-token", authController.refreshToken);

router.use(authLimiter);

router.post("/signup", authController.signup);
router.post("/login", authController.logIn);

export default router;
