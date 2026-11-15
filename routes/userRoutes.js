import { Router } from "express";
import UserRoutes from "../controllers/userController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

const router = Router();

const userRoutes = new UserRoutes();

router.get("/", userRoutes.getAll.bind(userRoutes));

router.get("/:id", userRoutes.getById.bind(userRoutes));

router.post("/", authMiddlewares, userRoutes.createUser.bind(userRoutes));

router.put("/:id", authMiddlewares, userRoutes.updateUser.bind(userRoutes));

router.delete("/:id", authMiddlewares, userRoutes.deleteUser.bind(userRoutes));

export default router;
