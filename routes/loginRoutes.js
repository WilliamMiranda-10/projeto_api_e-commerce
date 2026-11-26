import { Router } from "express";
import { login } from "../controllers/loginController.js";
import validateSchema from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";

const router = Router()

router.post("/login", validateSchema(loginSchema), login)


export default router
