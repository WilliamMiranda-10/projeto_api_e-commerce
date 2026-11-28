import PurchasesRepository from "../repository/PurchasesRepository.js";

class PurchasesController {
  async getAllPurchases(req, res) {
    try {
      const { id } = req.params;

      if (id !== req.user.id) {
        res.status(403).json({ message: "Acesso negado!" });
      }

      const result = await new PurchasesRepository().getAllPurchases(id);

      return res.status(200).json(result);
    } catch (error) {}
  }

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
