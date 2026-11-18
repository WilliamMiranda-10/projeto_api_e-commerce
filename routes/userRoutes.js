import { Router } from "express";
import UserController from "../controllers/userController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

const router = Router();

const UserController = new UserController();

router.get("/", UserController.getAll.bind(UserController));

router.get("/:id", UserController.getById.bind(UserController));

router.post(
  "/",
  authMiddlewares,
  UserController.createUser.bind(UserController)
);

router.put(
  "/:id",
  authMiddlewares,
  UserController.updateUser.bind(UserController)
);

router.delete(
  "/:id",
  authMiddlewares,
  UserController.deleteUser.bind(UserController)
);

export default router;

