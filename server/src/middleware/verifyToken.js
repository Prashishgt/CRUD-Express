import { UnauthenticatedError } from "../error/customError.js";
import { verifyJWT } from "../helper/jwt.js";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) throw new UnauthenticatedError("No token provided");
  const decoded = verifyJWT(token);
  req.user = decoded.user;
  next();
};

export default verifyToken;
