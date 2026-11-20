import { Router } from "express";

import { authMiddlewares } from "../middlewares/authMiddleware.js";
import ProductsController from "../controllers/productController.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema.js";

const router = Router();

const productsController = new ProductsController();

router.get("/", productsController.getAll.bind(productsController));

router.get("/:id", productsController.getById.bind(productsController));

router.post(
  "/",
  authMiddlewares,
  validateSchema(createProductSchema),
  productsController.store.bind(productsController)
);

router.put(
  "/:id",
  authMiddlewares,
  validateSchema(updateProductSchema),
  productsController.update.bind(productsController)
);

router.delete(
  "/:id",
  authMiddlewares,
  productsController.delete.bind(productsController)
);

export default router;
