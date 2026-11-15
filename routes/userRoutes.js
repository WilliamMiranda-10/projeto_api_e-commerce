import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import UserRoutes from "../controllers/userController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

const router = Router();

const userRoutes = new UserRoutes();

router.get("/", userRoutes.getAll.bind(userRoutes));

router.get("/:id", userRoutes.getById.bind(userRoutes));

router.post("/", authMiddlewares, userRoutes.createUser.bind(userRoutes));

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await new UserRepository().update(body, id);
  res.status(200).send("Usuário Atualizado");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await new UserRepository().delete(id);
  res.status(200).send("Usuário deletado");
});

export default router;
