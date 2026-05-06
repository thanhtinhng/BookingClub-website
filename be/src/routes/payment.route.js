import express from "express";
import {
  createPayment,
  checkPayment,
} from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";
import cookieUtils from "../utils/cookie.js";

const paymentRouter = express.Router();

paymentRouter.post("/bookings/:bookingId/payments/vnpay", auth, cookieUtils.requireCsrf, createPayment);
paymentRouter.get("/payments/vnpay/return", checkPayment);

export default paymentRouter;
