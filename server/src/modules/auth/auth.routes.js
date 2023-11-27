import { Router } from "express";
import {
  registerUser,
  loginUser,
  regenerateJWTToken,
} from "./auth.controller.js";
import { BadRequestError } from "../../error/customError.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.json({ data: result, msg: "Success" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError(`${!email ? "Email" : "Password"} is missing.`);
    }
    const result = await loginUser(email, password);
    res.json({ data: result, msg: "Success" });
  } catch (e) {
    next(e);
  }
});

router.post("/regenerate", async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw new BadRequestError("Email is missing");
  const result = await regenerateJWTToken(email);
  res.json({ data: result, msg: "success" });
});
export default router;
