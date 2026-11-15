import { Router } from "express";

import { authMiddlewares } from "../middlewares/authMiddleware.js";
import ProductsController from "../controllers/productController.js";

const router = Router();

const productsController = new ProductsController();

router.get("/", productsController.getAll.bind(productsController));

router.get("/:id", productsController.getById.bind(productsController));

router.post(
  "/",
  authMiddlewares,
  productsController.store.bind(productsController)
);

router.put(
  "/:id",
  authMiddlewares,
  productsController.update.bind(productsController)
);

router.delete(
  "/:id",
  authMiddlewares,
  productsController.delete.bind(productsController)
);

export default router;
