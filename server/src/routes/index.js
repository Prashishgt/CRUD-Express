import { Router } from "express";
import apiRouter from "./apiRouter.js";
import notFound from "../utils/notFound.js";

const router = Router();

// routes for each module
router.use("/api/v1", apiRouter);

// route for unknown route
router.all("*", notFound);

export default router;
