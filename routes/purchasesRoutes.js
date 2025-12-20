import { Router } from "express";
import PurchasesController from "../controllers/purchasesController.js";

const router = Router();
const purchasesContoller = new PurchasesController();

router.post("/", (req, res) => purchasesContoller.create(req, res));


export default router
