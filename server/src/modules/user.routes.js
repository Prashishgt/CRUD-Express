import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  updateUser,
} from "./user.controller";

const router = express.Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/register").post(createUser);

export default router;
