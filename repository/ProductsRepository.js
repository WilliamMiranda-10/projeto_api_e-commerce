import BaseRepository from "./BaseRepository.js";

class ProductRepository extends BaseRepository {
  async getAll() {
    try {
      const result = await super.getAll("products", [
        "id",
        "name",
        "price_in_cents",
        "size",
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await super.getById(
        "products",
        ["id", "name", "price_in_cents", "size"],
        id
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
    async insertInto(valuesArray) {
      try {
        const result = await super.insertInto(
          "products",
          ["name", "price_in_cents", "size"],
          valuesArray
        );
        return result;
      } catch (error) {
        throw error;
      }
    }
    async updateProduct(body, id) {
      try {
        const result = await super.updateProduct("products", body, id);
        return result;
      } catch (error) {
        throw error;
      }
    }
    async deleteProduct(id) {
      try {
        const result = await super.deleteProduct("products", id);
        return result;
      } catch (error) {
        throw error;
      }
    }
}

export default ProductRepository;






