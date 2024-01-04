import express from 'express';
import DepositionsController from '../controllers/depositionController.js';

const routes = express.Router();

routes.get('/depoimentos', DepositionsController.getDepositions);
routes.post('/depoimentos', DepositionsController.saveDeposition);
routes.delete('/depoimentos', DepositionsController.deleteDeposition);

export default routes;
