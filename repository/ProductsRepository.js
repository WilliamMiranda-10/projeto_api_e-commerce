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
    async updateUser(body, id) {
      try {
        const result = await super.updateUser("products", body, id);
        return result;
      } catch (error) {
        throw error;
      }
    }
    async deleteUser(id) {
      try {
        const result = await super.deleteUser("products", id);
        return result;
      } catch (error) {
        throw error;
      }
    }
}

export default ProductRepository;






