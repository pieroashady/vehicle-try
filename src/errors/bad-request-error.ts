import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: string) {
    super('Bad request error');
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return this.errors;
  }
}
