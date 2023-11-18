import { Router } from "express";
import userRouter from "../modules/users/user.routes.js";
import authRouter from "../modules/auth/auth.routers.js";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;
