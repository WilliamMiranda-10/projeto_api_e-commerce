import { hashPassword } from "../utils/hashPassword.js";
import UserRepository from "../repository/UserRepository.js";

export async function createUser(req, res) {
  
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    return res.status(400).json({
      message: "Preencha todos os campos corretamente!",
    });
  }

  const passwordHash = await hashPassword(password);

  const userData = {
    name,
    surname,
    email,
    password: passwordHash,
  };

  const valuesArray = Object.values(userData);

  const userRepository = new UserRepository();
  await userRepository.insertInto(valuesArray);

  res.status(201).json({ message: "Usuário criado com sucesso!" });
}

// receber os dados da requisição
// validar os dados obrigatórios
// verificar se o usuário já existe no banco
// gerar hash da senha
// salvar o usuário com o hash no banco
// retornar resposta sem a senha
