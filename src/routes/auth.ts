import express, { Router } from "express";

import { validateSchema } from "../middlewares/validation.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import { login, register, verify } from "../controllers/auth.js";

const router: Router = express.Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify/:token",verify)

export default router;
