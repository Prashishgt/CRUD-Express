import { Router } from "express";
import apiRouter from "./apiRouter.js";
import notFoundMiddleware from "../middleware/notFound.js";

const router = Router();

// routes for each module
router.use("/api/v1", apiRouter);

// route for unknown route
router.all("*", notFoundMiddleware);

export default router;
