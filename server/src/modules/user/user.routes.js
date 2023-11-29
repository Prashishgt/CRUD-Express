import { Router } from "express";
import {
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} from "./user.controller.js";
import secure from "../../helper/secure.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

// just for demo can be implemented in future such as roles etc
router.get("/:id/profile", secure(), async (req, res, next) => {
  res.json({ message: "This is the user profile page", user: req.user });
});

export default router;
