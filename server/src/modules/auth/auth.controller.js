import bcrypt from "bcrypt";
import UserModel from "../user/user.model.js";
import AuthModel from "./auth.model.js";
import { BadRequestError } from "../../error/customError.js";

import { createToken, verifyJWT } from "../../helper/jwt.js";

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new BadRequestError(`User doesn't exist.`);
  const checkPassword = await bcrypt.compare(password, user?.password);
  if (!checkPassword) throw new BadRequestError(`Password is invalid`);

  const payload = {
    id: user?._id,
    email: user?.email,
  };

  const token = createToken(payload);
  console.log("Token is", token);
  return {
    user: { name: user?.name, email: user?.email },
    token,
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
  await AuthModel.create({ email: createUser?.email, accessToken: 0 });

  return createUser;
};

const regenerateJWTToken = async (email) => {
  // email exists check
  const user = await AuthModel.findOne({ email });
  if (!email) throw new BadRequestError(`User with ${email} does not exist.`);

  const payload = {
    id: user?._id,
    email: user?.email,
  };

  const newToken = createToken(payload);
  console.log("New jwt token", newToken);
  await AuthModel.findOneAndUpdate(
    { email },
    { token: newToken },
    { new: true }
  );
  return true;
};

export { registerUser, loginUser, regenerateJWTToken };
