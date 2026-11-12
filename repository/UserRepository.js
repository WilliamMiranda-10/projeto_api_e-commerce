import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  async getAll() {
    const result = await super.getAll("users", [
      "id",
      "name",
      "surname",
      "email",
    ]);
    return result;
  }
  async getById(id) {
    const result = await super.getById(
      "users",
      ["id", "name", "surname", "email"],
      id
    );
    return result;
  }
  async insertInto(valuesArray) {
    const result = await super.insertInto(
      "users",
      ["name", "surname", "email", "password"],
      valuesArray
    );
    return result;
  }

  async update(body, id) {
    const result = await super.update("users", body, id);
    return result;
  }

  async delete(id) {
    const result = await super.delete("users", id);
    return result;
  }
}

export default UserRepository;
