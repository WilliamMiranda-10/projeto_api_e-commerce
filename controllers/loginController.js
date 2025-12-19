import pool from "../repository/db.js";
import { comparePassword } from "../services/passwordService.js";
import { gerarToken } from "../services/tokenService.js";

export async function login(req, res) {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT id, email, password FROM users WHERE email = $1",
    [email]
  );

  if (!result) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  if (result.rowCount === 0) {
    return res.status(401).json({ message: "Email ou senha inválidas!" });
  }

  // pegar usuario
  const user = result.rows[0];
  //verificar se a senha e valida
  const validatePassword = await comparePassword(password, user.password);
  // se nao for valida retorna um erro
  if (!validatePassword) {
    res.status(401).json({ erro: "Senha inválida." });
  }
  //chamar function gerarToken e passa email e id
  const token = gerarToken({
    id: user.id,
    email: user.email,
  });

  res.json({ token });
}
