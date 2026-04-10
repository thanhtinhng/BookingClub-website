import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 10 // tối đa 10 request / IP
});

router.post("/register", register);
router.post("/login", limiter, login); //trong 1 phut chi request duoc 10 lan

export default router;
