import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import validate from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { authLimiter } from "../middleware/rateLimit.middleware";
const router = Router();
router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);

export default router;
