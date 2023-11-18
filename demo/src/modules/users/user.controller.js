import { StatusCodes } from "http-status-codes";
import { UserModel } from "./user.model.js";
import { BadRequestError } from "../../error/badRequest.js";

const getAllUser = async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(StatusCodes.OK).json({ allUsers, success: true });
};

const getUser = async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new BadRequestError(`User with ID ${userId} does not exist.`);
  }
  res.status(StatusCodes.OK).json({ user, success: true });
};

const deleteUser = async (req, res, next) => {
  const { id: userId } = req.params;
  const deleteUser = await UserModel.findOneAndDelete({ _id: userId });

  if (!deleteUser) {
    throw new BadRequestError(`Delete operation failed.`);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User successfully deleted", success: true });
};

const updateUser = async (req, res, next) => {
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
};

export { getUser, getAllUser, deleteUser, updateUser };
