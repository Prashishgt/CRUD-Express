import bcrypt from "bcrypt";
import UserModel from "../user/user.model.js";
import AuthModel from "./auth.model.js";
import { BadRequestError } from "../../error/customError.js";

import { verifyJWT } from "../../helper/jwt.js";
import {
  comparePassword,
  generateTokens,
  getUserByEmail,
} from "./auth.helper.js";

const registerUser = async (payload) => {
  const { password, email, ...rest } = payload;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(`User with ${email} already exists.`);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await UserModel.create({
    email,
    password: hashedPassword,
    ...rest,
  });

  await AuthModel.create({ email: createdUser?.email });
  return createdUser;
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) throw new BadRequestError(`User doesn't exist.`);

  const isPasswordValid = await comparePassword(password, user?.password);
  if (!isPasswordValid) throw new BadRequestError(`Password is invalid`);

  const { name, email: userEmail } = user;
  const { accessToken, refreshToken } = generateTokens(user);

  return {
    user: { name, email: userEmail },
    accessToken,
    refreshToken,
  };
};

const regenerateToken = async (refreshToken) => {
  const decodedRefreshToken = verifyJWT(refreshToken);
  if (!decodedRefreshToken) {
    throw new BadRequestError("Invalid or expired refresh token");
  }

  const { data } = decodedRefreshToken;
  const user = await getUserByEmail(data.email);

  if (!user) {
    throw new BadRequestError(`User with email ${email} not found`);
  }

  const { accessToken } = generateTokens(user);
  return { accessToken };
};

export { registerUser, loginUser, regenerateToken };
