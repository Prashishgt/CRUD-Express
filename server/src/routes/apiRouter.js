import { Router } from "express";
import userRouter from "../modules/user/user.routes.js";
import authRouter from "../modules/auth/auth.routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
