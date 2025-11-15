import express from "express";
const router = express.Router();

import { authLimiter, validateReq } from "../../middlewares/index.js";
import { registerSchema, loginSchema } from "../../schemas/index.js";

import * as authController from "../../controllers/auth/index.js";

router.post("/refresh-token", authController.refreshToken);

router.use(authLimiter);

router.post(
  "/signup",
  validateReq({ body: registerSchema }),
  authController.signup
);
router.post("/login", validateReq({ body: loginSchema }), authController.login);

export default router;
