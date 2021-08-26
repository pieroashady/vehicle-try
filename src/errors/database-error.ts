import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public errors: any) {
    super("Error connecting to db");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return "Error connecting to db";
  }
}
