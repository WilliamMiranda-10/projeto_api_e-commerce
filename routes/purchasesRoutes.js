import { Router } from "express";
import PurchasesController from "../controllers/purchasesController.js";
import { authMiddlewares } from "../middlewares/authMiddleware.js";

const router = Router();
const purchasesContoller = new PurchasesController();

router.post("/", authMiddlewares, (req, res) => purchasesContoller.create(req, res));


export default router
