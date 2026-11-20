import PurchasesRepository from "../repository/PurchasesRepository.js";

class PurchasesController {
  async create(req, res) {
    try {
      const { purchases_date, delivery_address, products } = req.body;

      const result = await new PurchasesRepository().createPurchases(
        { purchases_date, user_id: req.user.id, delivery_address },
        products
      );

      return res.status(201).json({
        message: "Compra criada com sucesso!",
        purchaseId: result.purchaseId,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }
}

export default PurchasesController;
