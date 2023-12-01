import { Router } from "express";
import { registerUser, loginUser, regenerateToken } from "./auth.controller.js";
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
  res.json({ data: result, msg: "Success" });
});

router.post("/token", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new BadRequestError("Refresh token is missing");
  }
  const result = await regenerateToken(refreshToken);
  res.json({ data: result, msg: "success" });
});
export default router;
