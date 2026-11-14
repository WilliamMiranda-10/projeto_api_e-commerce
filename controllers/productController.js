import ProductRepository from "../repository/ProductsRepository.js";

class ProductsController {
  async getAll(req, res) {
    try {
      const result = await new ProductRepository().getAll();
      return res.status(200).json(result);
    } catch (error) {}
  }
}

export default ProductsController;
