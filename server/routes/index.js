import { Router } from "express";
import apiRouter from "./apiRouter.js";

const router = Router();

router.use("/api/v1", apiRouter);

export default router;
