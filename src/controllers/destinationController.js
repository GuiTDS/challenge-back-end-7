import { destination } from '../models/index.js';
import NotFoundError from '../errors/NotFoundError.js';

class DestinationController {
  static async getDestination(req, res, next) {
    try {
      const search = processSearch(req.query);
      const destinationList = search !== null
        ? await destination.find(search)
        : await destination.find();
      if (destinationList.length === 0) res.status(200).json({ message: 'Nenhum destino encontrado' });
      else res.status(200).json(destinationList);
    } catch (error) {
      next(error);
    }
  }

  static async getDestinationById(req, res, next) {
    try {
      const destinationId = req.params.id;
      const searchedDestination = await destination.findById(destinationId);
      if (searchedDestination) {
        res.status(200).json(searchedDestination);
      } else {
        next(new NotFoundError('Destino não encontrado'));
      }
    } catch (error) {
      next(error);
    }
  }

  static async saveDestination(req, res, next) {
    try {
      const destinationData = req.body;
      const newDestination = await destination.create(destinationData);
      res.status(201).json({ message: 'Destination created successfully', newDestination });
    } catch (error) {
      next(error);
    }
  }

  static async updateDestination(req, res, next) {
    try {
      const destinationId = req.params.id;
      const destinationData = req.body;

      if (await destination.findByIdAndUpdate(destinationId, destinationData) !== null) {
        const updatedDestination = await destination.findById(destinationId);
        res.status(200).json({ message: 'Destination updated successfully', updatedDestination });
      } else {
        next(new NotFoundError('Destination not found!'));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteDestination(req, res, next) {
    try {
      const destinationId = req.params.id;
      if (await destination.findByIdAndDelete(destinationId) !== null) {
        res.status(200).json({ message: 'Destination deleted successfully' });
      } else {
        next(new NotFoundError('Destination not found!'));
      }
    } catch (error) {
      next(error);
    }
  }
}

function processSearch(parameters) {
  const { name } = parameters;
  const search = {};
  if (name) search.name = { $regex: name, $options: 'i' };

  return search;
}

export default DestinationController;
