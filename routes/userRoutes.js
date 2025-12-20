import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await new UserRepository().getAll();
  res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await new UserRepository().getById(id);
  res.status(200).send(result);
});

router.post("/", createUser);


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await new UserRepository().updateUser(body, id);
  res.status(200).send("Usuário Atualizado");
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await new UserRepository().deleteUser(id);
  res.status(200).send("Usuário deletado");
});

export default router;
