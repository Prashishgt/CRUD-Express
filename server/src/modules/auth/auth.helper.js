import bcrypt from "bcrypt";
import { createToken } from "../../helper/jwt.js";
import UserModel from "../user/user.model.js";

const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
};

const generateTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = createToken(payload, false);
  const refreshToken = createToken(payload, true);

  return { accessToken, refreshToken };
};

export { getUserByEmail, comparePassword, generateTokens };
