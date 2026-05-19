import express from 'express';
import { getSportComplexDetails, searchSportComplex, getComplexesMapController } from '../controllers/sport_complex.controller.js';
const sportComplexRouter = express.Router();

sportComplexRouter.get('/detail/:slug', getSportComplexDetails);
sportComplexRouter.get('/search', searchSportComplex);
sportComplexRouter.get('/map', getComplexesMapController);
export default sportComplexRouter;
