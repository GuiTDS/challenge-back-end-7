import { depositions } from '../models/Depositions.js';

class DepositionsController {
  static async getDepositions(req, res, next) {
    try {
      const depositionsList = await depositions.find();
      res.status(200).json(depositionsList);
    } catch (error) {
      next(error);
    }
  }
}

export default DepositionsController;
