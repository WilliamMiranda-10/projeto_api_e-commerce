import { Router } from "express";
import PurchasesController from "../controllers/purchasesController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";
import validateSchema from "../middlewares/validateSchema.js";
import { createPurchaseSchema } from "../schemas/purchaseSchema.js";

const router = Router();
const purchasesContoller = new PurchasesController();

router.post(
  "/",
  authMiddlewares,
  validateSchema(createPurchaseSchema),
  purchasesContoller.create.bind(purchasesContoller)
);

export default router;
