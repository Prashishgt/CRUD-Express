import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import { UserModel } from "./user.model.js";
import { BadRequestError } from "../../error/badRequest.js";

const getAllUser = asyncWrapper(async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(StatusCodes.OK).json({ allUsers, success: true });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await UserModel.find({ _id: userId });
  if (!user) {
    throw new BadRequest(`User with ID ${userId} does not exist.`);
  }
  res.status(StatusCode.OK).json({ user, success: true });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const deleteUser = await UserModel.findOneAndDelete({ _id: userId });

  if (!deleteUser) {
    throw new BadRequest(`Delete operation failed.`);
  }
  res
    .status(StatusCode.OK)
    .json({ message: "User successfully deleted", success: true });
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
    throw new BadRequest(`User with ID ${userId} does not exist.`);
  }
  res.status(StatusCode.OK).json({ updateUser, success: true });
});

export { getUser, getAllUser, deleteUser, updateUser };
