import { Router } from "express";
import userRouter from "../modules/user.routes";

const router = Router();

router.use("/", (req, res) => {
  res.json({ success: true });
});

router.use("/user", userRouter);

router.all("*", (req, res) => {
  res.status(404).json({ msg: "Route doesn't exist" });
});

export default router;
