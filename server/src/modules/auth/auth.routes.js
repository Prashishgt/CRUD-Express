import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import { BadRequestError } from "../../error/customError.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.json({ data: result, msg: "Success" });
  } catch (error) {
    console.log(error);
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

export default router;
