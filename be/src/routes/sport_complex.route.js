import express from 'express';
import { getSportComplexDetails } from '../controllers/sport_complex.controller.js';
const sportComplexRouter = express.Router();

sportComplexRouter.get('/:slug', getSportComplexDetails);

export default sportComplexRouter;