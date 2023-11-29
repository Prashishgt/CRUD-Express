import { Router } from "express";
import {
  registerUser,
  loginUser,
  regenerateJWTToken,
} from "./auth.controller.js";
import { BadRequestError } from "../../error/customError.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  const result = await registerUser(req.body);
  res.json({ data: result, msg: "Success" });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`${!email ? "Email" : "Password"} is missing.`);
  }
  const result = await loginUser(email, password);
  console.log("Result is here :", result);
  res.json({ data: result, msg: "Success" });
});

router.post("/regenerate", async (req, res, next) => {
  const refreshToken = req.headers.authorization;

  if (!refreshToken) {
    throw new BadRequestError("Refresh token is missing");
  }
  const result = await regenerateJWTToken(refreshToken);
  res.json({ data: result, msg: "success" });
});
export default router;
