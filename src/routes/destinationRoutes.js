import express from 'express';
import DestinationController from '../controllers/destinationController.js';

const routes = express.Router();

routes.get('/destinos', DestinationController.getDestination);
routes.post('/destinos', DestinationController.saveDestination);
routes.put('/destinos/:id', DestinationController.updateDestination);
routes.delete('/destinos/:id', DestinationController.deleteDestination);

export default routes;
