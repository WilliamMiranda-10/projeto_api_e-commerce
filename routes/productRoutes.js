import { Router } from "express";
import ProductRepository from "../repository/ProductsRepository.js";

const router = Router();

router.get("/", async (req, res) => {
  const result = await new ProductRepository().getAll();
  res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await new ProductRepository().getById(id);
  res.json(result);
});

router.post("/", async (req, res) => {
  const { body } = req;
  const columnsArray = ["name", "price_in_cents", "size"];
  const valuesArray = columnsArray.map((columnsName) => body[columnsName]);
  const result = await new ProductRepository().insertInto(valuesArray);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await new ProductRepository().updateUser(body, id);
  res.status(200).send(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await new ProductRepository().deleteUser(id);
  res.send('Usuario excluido')
});

export default router;
