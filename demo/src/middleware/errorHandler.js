import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "../error/index.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log("Status code", err);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong try again later" });
};

export default errorHandlerMiddleware;
