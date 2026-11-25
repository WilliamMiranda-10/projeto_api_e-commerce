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
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expirado." });
    } else if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.NotBeforeError
    ) {
      return res
        .status(401)
        .json({ message: "Token inválido ou ainda não autorizado." });
    } else {
      console.error(error);
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  }
}
