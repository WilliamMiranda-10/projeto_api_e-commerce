import AppError from "../errors/AppError.js";
import ProductRepository from "../repository/ProductsRepository.js";

class ProductsController {
  async getAll(req, res) {
    try {
      const result = await new ProductRepository().getAll();

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      const result = await new ProductRepository().getById(id);

      if (!result) {
        throw new AppError("Produto não encontrado.", 404);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async store(req, res) {
    try {
      const { name, price_in_cents, amount } = req.body;

      const valuesArray = [name, price_in_cents, amount];

      const result = await new ProductRepository().insertInto(valuesArray);

      return res
        .status(201)
        .json({ message: "Produto cadastrado com sucesso.", product: result });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async update(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      const result = await new ProductRepository().updateProduct(body, id);

      return res
        .status(200)
        .json({ message: "Produto atualizado com sucesso.", product: result });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await new ProductRepository().deleteProduct(id);

      return res.status(200).json({ message: "Produto excluido." });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }
}

export default ProductsController;
