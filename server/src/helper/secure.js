import { verifyJWT } from "./jwt.js";
import UserModel from "../modules/user/user.model.js";
import { BadRequestError, UnauthenticatedError } from "../error/customError.js";

const secure = () => {
  return async (req, res, next) => {
    const token = req?.headers?.authorization;
    if (!token) throw new BadRequestError("Access Token is Required.");
    const accessToken = token("Bearer ");
    const isValid = verifyJWT(accessToken);
    if (!isValid)
      throw new BadRequestError("Access Token has expired, try again later");
    const { data } = isValid;
    const { email } = data;

    const user = await UserModel.findOne({ email });
    if (!user) throw new BadRequestError(`User with ${email} does not exist.`);

    next();
  };
};

export default secure;
