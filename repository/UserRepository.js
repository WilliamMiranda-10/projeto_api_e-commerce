import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  async getAll() {
    try {
      const result = await super.getAll("users", [
        "id",
        "name",
        "surname",
        "email",
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const result = await super.getById(
        "users",
        ["id", "name", "surname", "email"],
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
        "users",
        ["name", "surname", "email", "password"],
        valuesArray
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(body, id){
    try {
      const result = await super.updateUser("users", body , id )
      return result
    } catch (error) {
      throw error
    }
  }
  async deleteUser(id){
    try {
      const result = await super.deleteUser('users', id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default UserRepository;


