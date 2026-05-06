import express from "express";
import {
  createPayment,
  checkPayment,
} from "../controllers/payment.controller.js";
import auth from "../middlewares/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/bookings/:bookingId/payments/vnpay", auth, createPayment);
paymentRouter.get("/payments/vnpay/return", checkPayment);

export default paymentRouter;
