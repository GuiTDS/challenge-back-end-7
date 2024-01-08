import { destination } from '../models/index.js';
import NotFoundError from '../errors/NotFoundError.js';

class DestinationController {
  static async getDestination(req, res, next) {
    try {
      const destinationList = await destination.find();
      res.status(200).json(destinationList);
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

export default DestinationController;
