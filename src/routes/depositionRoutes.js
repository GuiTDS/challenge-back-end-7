import express from 'express';
import DepositionsController from '../controllers/depositionController.js';

const routes = express.Router();

routes.get('/depoimentos', DepositionsController.getDepositions);

export default routes;
