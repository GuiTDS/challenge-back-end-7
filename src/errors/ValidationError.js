import RequestError from './RequestError.js';

class ValidationError extends RequestError {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join('; ');
    super(`The following errors were found: ${errorMessages}`);
  }
}

export default ValidationError;
