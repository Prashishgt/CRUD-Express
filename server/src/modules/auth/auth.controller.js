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
  // updating password by using passBy reference
  rest.password = await bcrypt.hash(password, 10);
  console.log("Rest data", rest);
  const createUser = await UserModel.create(rest);
  await AuthModel.create({ email: createUser?.email, token: 1234 });

  return createUser;
};

export { registerUser, loginUser };
