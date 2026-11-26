import { Router } from "express";
import UserController from "../controllers/userController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";

const router = Router();

const userController = new UserController();

router.get("/", authMiddlewares, userController.getAll.bind(userController));

router.get(
  "/:id",
  authMiddlewares,
  userController.getById.bind(userController)
);

router.post(
  "/",
  authMiddlewares,
  validateSchema(createUserSchema),
  userController.createUser.bind(userController)
);

router.put(
  "/:id",
  authMiddlewares,
  validateSchema(updateUserSchema),
  userController.updateUser.bind(userController)
);

router.delete(
  "/:id",
  authMiddlewares,
  userController.deleteUser.bind(userController)
);

export default router;
