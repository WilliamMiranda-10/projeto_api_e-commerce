import { hashPassword } from "../utils/hashPassword.js";
import UserRepository from "../repository/UserRepository.js";
import AppError from "../errors/AppError.js";

class UserController {
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

      if (id !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado!" });
      }

      const result = await new UserRepository().getById(id);

      if (!result) {
        throw new AppError("Usuário não encontrado.", 404);
      }

      return res.status(200).json(result);
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
        throw new AppError("Preencha todos os campos corretamente!", 400);
      }
      if (!email.includes("@")) {
        throw new AppError("Email inválido.");
      }

      if (password.length < 6) {
        throw new AppError("A senha deve ter pelo menos 6 caracteres.");
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
      if (error.code === "23505") {
        return res.status(409).json({ message: "E-mail já cadastrado." });
      }
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async updateUser(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      if (id !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado!" });
      }

      const userData = { ...body };

      if ("password" in userData && userData.password.trim() === "") {
        throw new AppError("A senha não pode estar vazia.", 400);
      }

      if ("password" in userData) {
        const passwordHash = await hashPassword(userData.password);

        userData.password = passwordHash;
      }

      const result = await new UserRepository().update(userData, id);

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso.", user: result });
    } catch (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          message:
            "Não foi possível atualizar: este e-mail já está cadastrado para outro usuário.",
        });
      }

      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (id !== req.user.id) {
        return res.status(403).json({ message: "Acesso negado!" });
      }

      await new UserRepository().delete(id);

      return res.status(200).json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }
}

export default UserController;
