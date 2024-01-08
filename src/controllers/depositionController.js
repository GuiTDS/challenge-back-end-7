import NotFoundError from '../errors/NotFoundError.js';
import { depositions } from '../models/index.js';

class DepositionsController {
  static async getDepositions(req, res, next) {
    try {
      const depositionsList = await depositions.find();
      res.status(200).json(depositionsList);
    } catch (error) {
      next(error);
    }
  }

  static async getFirstDepositions(req, res, next) {
    try {
      const firstDepositions = await depositions.find().limit(3);
      res.status(200).json(firstDepositions);
    } catch (error) {
      next(error);
    }
  }

  static async saveDeposition(req, res, next) {
    try {
      const depositionData = req.body;
      const newDeposition = await depositions.create(depositionData);
      res.status(201).json({ message: 'Deposition created successfully', newDeposition });
    } catch (error) {
      next(error);
    }
  }

  static async updateDeposition(req, res, next) {
    try {
      const depositionId = req.params.id;
      const depositionData = req.body;

      if (await depositions.findByIdAndUpdate(depositionId, depositionData) !== null) {
        const updatedDeposition = await depositions.findById(depositionId);
        res.status(200).json({ message: 'Deposition updated successfully', updatedDeposition });
      } else {
        next(new NotFoundError('Deposition not found!'));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteDeposition(req, res, next) {
    try {
      const depositionId = req.params.id;
      if (await depositions.findByIdAndDelete(depositionId) !== null) {
        res.status(200).json({ message: 'Deposition deleted successfully' });
      } else {
        next(new NotFoundError('Deposition not found!'));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default DepositionsController;
