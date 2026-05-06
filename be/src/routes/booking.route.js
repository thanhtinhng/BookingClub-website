import express from "express";
import {
  cancelBookingController,
  createBookingController
} from "../controllers/booking.controller.js";
import auth from "../middlewares/auth.middleware.js";
import cookieUtils from "../utils/cookie.js";

const bookingRouter = express.Router();

bookingRouter.patch("/:bookingId/cancel", auth, cookieUtils.requireCsrf, cancelBookingController);
bookingRouter.post("/", auth, cookieUtils.requireCsrf, createBookingController);

export default bookingRouter;
