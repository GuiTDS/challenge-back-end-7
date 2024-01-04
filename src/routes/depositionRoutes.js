import express from 'express';
import DepositionsController from '../controllers/depositionController.js';

const routes = express.Router();

routes.get('/depoimentos', DepositionsController.getDepositions);
routes.post('/depoimentos', DepositionsController.saveDeposition);
routes.put('/depoimentos/:id', DepositionsController.updateDeposition);
routes.delete('/depoimentos/:id', DepositionsController.deleteDeposition);

export default routes;
