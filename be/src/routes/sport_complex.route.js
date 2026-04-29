import express from 'express';
import { getSportComplexDetails, searchSportComplex } from '../controllers/sport_complex.controller.js';
const sportComplexRouter = express.Router();

sportComplexRouter.get('/detail/:slug', getSportComplexDetails);
sportComplexRouter.get('/search', searchSportComplex);
export default sportComplexRouter;