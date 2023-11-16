import asyncWrapper from "../utils/asyncWrapper.js";
import { UserModel } from "./user.model.js";
import { createCustomError } from "../error/customError.js";

const getAllUser = asyncWrapper(async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(200).json({ allUsers, success: true });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await UserModel.find({ _id: userId });
  if (!user) {
    return next(createCustomError(`Not user with id ${userId} exist`, 404));
  }
  res.status(200).json({ user, success: true });
});

const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, age, password, cpassword } = req.body;

  if (!name || !email || !age || !password || !cpassword) {
    return next(createCustomError("Fields cannot be empty", 404));
  }
  if (password !== cpassword) {
    return next(createCustomError("Password do not match", 404));
  }

  const register = await UserModel.create({ name, email, age, password });

  if (!register) {
    return next(createCustomError("Registration failed", 400));
  }

  res.status(201).json({ message: "User created", success: true });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createCustomError(`${!email ? "Email" : "Password"} cannot be empty`, 404)
    );
  }
  const login = await UserModel.findOne({ email });
  if (!login) {
    return next(createCustomError(`User with ${email} doesn't exist`, 404));
  }
  if (login.password !== password) {
    return next(createCustomError(`Incorrect Password`, 400));
  }
  res
    .status(200)
    .json({ message: `${login.name} successfully logged in`, success: true });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const deleteUser = await UserModel.findOneAndDelete({ _id: userId });

  if (!deleteUser) {
    return next(createCustomError("Delete operation failed", 404));
  }
  res.status(200).json({ message: "User successfully deleted", success: true });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const updateUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateUser) {
    return next(createCustomError(`No User with id : ${userId}`), 404);
  }
  res.status(200).json({ updateUser, success: true });
});

export { getUser, getAllUser, loginUser, registerUser, deleteUser, updateUser };
