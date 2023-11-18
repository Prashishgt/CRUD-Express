import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../../middleware/asyncWrapper.js";
import { UserModel } from "./user.model.js";
import { BadRequestError } from "../../error/badRequest.js";

const getAllUser = asyncWrapper(async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(StatusCodes.OK).json({ allUsers, success: true });
});

const getUser = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const user = await UserModel.find({ _id: userId });
    if (!user) {
      throw new BadRequestError(`User with ID ${userId} does not exist.`);
    }
    res.status(StatusCodes.OK).json({ user, success: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const deleteUser = await UserModel.findOneAndDelete({ _id: userId });

  if (!deleteUser) {
    throw new BadRequestError(`Delete operation failed.`);
  }
  res
    .status(StatusCodes.OK)
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
    throw new BadRequestError(`User with ID ${userId} does not exist.`);
  }
  res.status(StatusCodes.OK).json({ updateUser, success: true });
});

export { getUser, getAllUser, deleteUser, updateUser };
