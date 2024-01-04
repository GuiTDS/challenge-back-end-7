import mongoose from 'mongoose';
import BaseError from '../errors/BaseError.js';
import NotFoundError from '../errors/NotFoundError.js';
import RequestError from '../errors/RequestError.js';
import ValidationError from '../errors/ValidationError.js';

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequestError().sendAnswer(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendAnswer(res);
  } else if (error instanceof NotFoundError) {
    error.sendAnswer(res);
  } else {
    new BaseError().sendAnswer(res);
  }
}

export default errorHandler;
