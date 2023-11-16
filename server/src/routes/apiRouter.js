import { Router } from "express";
import userRouter from "../modules/users/user.routes.js";

const router = Router();

router.use("/user", userRouter);

export default router;
