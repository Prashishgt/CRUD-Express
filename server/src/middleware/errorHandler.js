import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../error/customError.js";

const errorHandlerMiddleware = (err, req, res) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong" });
};

export default errorHandlerMiddleware;
