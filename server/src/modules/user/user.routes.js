import { Router } from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} from "./user.controller.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
