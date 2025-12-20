import { Router } from "express";
import ProductRepository from "../repository/ProductsRepository.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

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

router.post("/", authMiddlewares, async (req, res) => {
  const { body } = req;
  const columnsArray = ["name", "price_in_cents", "size"];
  const valuesArray = columnsArray.map((columnsName) => body[columnsName]);
  const result = await new ProductRepository().insertInto(valuesArray);
  res.json(result);
});

router.put("/:id", authMiddlewares, async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await new ProductRepository().updateProduct(body, id);
  res.status(200).send(result);
});

router.delete("/:id", authMiddlewares, async (req, res) => {
  const { id } = req.params;
  await new ProductRepository().deleteProduct(id);
  res.send("Usuário excluido");
});

export default router;


