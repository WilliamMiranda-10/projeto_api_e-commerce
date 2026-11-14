import { Router } from "express";

import { authMiddlewares } from "../middlewares/authMiddleware.js";
import ProductsController from "../controllers/productController.js";

const router = Router();

const productsController = new ProductsController();

router.get("/", async (req, res) => {
  return productsController.getAll(req, res);
});

router.get("/:id", async (req, res) => {
  return productsController.getById(req, res);
});

router.post("/", authMiddlewares, async (req, res) => {
  return productsController.store(req, res);
});

router.put("/:id", authMiddlewares, async (req, res) => {
  return productsController.update(req, res);
});

router.delete("/:id", authMiddlewares, async (req, res) => {
  const { id } = req.params;
  await new ProductRepository().deleteProduct(id);
  res.send("Usuário excluido");
});

export default router;
