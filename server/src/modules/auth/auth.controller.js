import bcrypt from "bcrypt";
import UserModel from "../user/user.model.js";
import AuthModel from "./auth.model.js";
import { BadRequestError } from "../../error/customError.js";

import { createToken, verifyJWT } from "../../helper/jwt.js";

const loginUser = async (email, password) => {
  let isRefreshToken = true;
  const user = await UserModel.findOne({ email });

  if (!user) throw new BadRequestError(`User doesn't exist.`);
  const checkPassword = await bcrypt.compare(password, user?.password);
  if (!checkPassword) throw new BadRequestError(`Password is invalid`);

  const payload = {
    id: user?._id,
    email: user?.email,
  };
  const accessToken = createToken(payload, !isRefreshToken);
  const refreshToken = createToken(payload, isRefreshToken);

  return {
    user: { name: user?.name, email: user?.email },
    accessToken,
    refreshToken,
  };
};

const registerUser = async (payload) => {
  let { password, ...rest } = payload;
  const checkUser = rest.email;
  // updating password by using passBy reference
  const ifExist = await UserModel.findOne({ email: checkUser });
  if (ifExist)
    throw new BadRequestError(`User with ${checkUser} already exist.`);
  rest.password = await bcrypt.hash(password, 10);
  const createUser = await UserModel.create(rest);
  await AuthModel.create({ email: createUser?.email, otp: 0 });

  return createUser;
};

const regenerateJWTToken = async (refreshToken) => {
  const decodedRefreshToken = verifyJWT(refreshToken);

  if (!decodedRefreshToken) {
    throw new BadRequestError("Invalid or expired refresh token");
  }

  const { email } = decodedRefreshToken;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new BadRequestError(`User with email ${email} not found`);
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const newAccessToken = createToken(payload);

  return { accessToken: newAccessToken };
};

export { registerUser, loginUser, regenerateJWTToken };
