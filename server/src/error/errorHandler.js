import { CustomApiError } from "./customError.js";

const errorHandler = (err, req, res, next) => {
  console.log("Error caught by errorHandler:", err);
  console.log(err instanceof CustomApiError);
  if (err instanceof CustomApiError) {
    // Handle CustomApiError
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // Default error handling
  console.log("Unhandled error:", err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

export default errorHandler;
