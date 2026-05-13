import e from "express";
import { getCalculatePrice, getAvailableSlots } from "../controllers/subfield.controller.js";
const subFieldRouter = e.Router();

subFieldRouter.get('/calculate-price', getCalculatePrice);
subFieldRouter.get('/:subField_id/available-time-slots', getAvailableSlots);
export default subFieldRouter;