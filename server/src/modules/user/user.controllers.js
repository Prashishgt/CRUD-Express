import { StatusCodes } from "http-status-codes";
import UserModel from "./user.models.js";
import { BadRequestError } from "../../error/customError";

const getAllUser = async (req, res) => {
  const allUsers = await UserModel.find({});
  if (!allUsers) throw new BadRequestError("There is no users.");
  res.status(StatusCodes.OK).json({ allUsers, success: true });
};

const getUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) throw new BadRequestError("User does not exist");
  res.status(StatusCodes.OK).json({ user, success: true });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const deletedUser = await UserModel.findOneAndDelete({ _id: userId });
  if (!deletedUser) throw new BadRequestError("User doesn't exist");
  res
    .status(StatusCodes.OK)
    .json({ message: `${deleteUser.email} has been deleted`, success: true });
};
