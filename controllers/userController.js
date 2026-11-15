import { hashPassword } from "../utils/hashPassword.js";
import UserRepository from "../repository/UserRepository.js";
import AppError from "../errors/AppError.js";

class UserRoutes {
  async getAll(req, res) {
    try {
      const result = await new UserRepository().getAll();

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

      const result = await new UserRepository().getById(id);

      if (!result) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      res.status(200).json(result);
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async createUser(req, res) {
    try {
      const { name, surname, email, password } = req.body;
  
      if (!name || !surname || !email || !password) {
        throw new AppError(
          { message: "Preencha todos os campos corretamente!" },
          400
        );
      }
  
      const passwordHash = await hashPassword(password);
      const userData = {
        name,
        surname,
        email,
        password: passwordHash,
      };
  
      const valuesArray = Object.values(userData);
  
      const result = await new UserRepository().insertInto(valuesArray);
  
      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", user: result });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }
}



export default UserRoutes;
