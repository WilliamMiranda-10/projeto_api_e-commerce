import BaseRepository from "./BaseRepository.js";

class ProductRepository extends BaseRepository {
  async getAll() {
    const result = await super.getAll("products", [
      "id",
      "name",
      "price_in_cents",
      "size",
    ]);
    return result;
  }
  async getById(id) {
    const result = await super.getById(
      "products",
      ["id", "name", "price_in_cents", "size"],
      id
    );
    return result;
  }
  async insertInto(valuesArray) {
    const result = await super.insertInto(
      "products",
      ["name", "price_in_cents", "size"],
      valuesArray
    );
    return result;
  }
  async updateProduct(body, id) {
    const result = await super.update("products", body, id);
    return result;
  }
  async deleteProduct(id) {
    const result = await super.delete("products", id);
    return result;
  }
}

export default ProductRepository;
