import express from "express";
import {
  login,
  register,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";
import rateLimit from 'express-rate-limit';
import auth from "../middlewares/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 15 // tối đa 15 request / IP
});

router.all("*", auth)

router.post("/register", register);
router.post("/login", limiter, login); //trong 1 phut chi request duoc 10 lan
router.get("/verify-email", verifyEmail);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", getMe);

export default router;
