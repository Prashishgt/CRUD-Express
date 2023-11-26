import { Router } from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} from "./user.controller.js";
import verifyToken from "../../middleware/verifyToken.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

router.get("/profile", verifyToken, async (req, res, next) => {
  res.json({ message: "This is the user profile page", user: req.user });
});

export default router;
