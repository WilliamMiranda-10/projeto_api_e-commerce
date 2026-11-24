import jwt from "jsonwebtoken";

export function authMiddlewares(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "O formato do token é inválido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "Configuração JWT não encontrada no servidor." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado!" });
  }
}
