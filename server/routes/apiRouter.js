import { Router } from "express";
import userRouter from "../modules/user.routes.js";

const router = Router();

router.use("/user", userRouter);

export default router;
