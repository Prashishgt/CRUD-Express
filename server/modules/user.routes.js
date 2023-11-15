import { Router } from "express";
import {
  getUser,
  getAllUser,
  loginUser,
  registerUser,
  deleteUser,
  updateUser,
} from "./user.controller.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/register").post(registerUser);
router.route("login").post(loginUser);

export default router;
