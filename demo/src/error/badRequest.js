import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./customError.js";

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export { BadRequestError };
