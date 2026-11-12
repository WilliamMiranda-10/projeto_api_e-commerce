import PurchasesRepository from "../repository/PurchasesRepository.js";

class PurchasesController {
  async create(req, res) {
    try {
      const { purchases_date, delivery_address, products } = req.body;

      if (!products || products.length === 0) {
        return res
          .status(400)
          .json({ error: "A Lista de produtos esta vazia!" });
      }

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
      return res.status(500).json({ error: "Error ao criar compra" });
    }
  }
}

export default PurchasesController;
