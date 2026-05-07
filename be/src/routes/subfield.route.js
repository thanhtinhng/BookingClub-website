import e from "express";
import {getCalculatePrice} from "../controllers/subfield.controller.js";
const subFieldRouter = e.Router();

subFieldRouter.get('/calculate-price', getCalculatePrice);

export default subFieldRouter;