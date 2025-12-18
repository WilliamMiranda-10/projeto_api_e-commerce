import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const hashCrypt = await bcrypt.hash(password, 10);
  return hashCrypt;
}

export async function comparePassword(password, hashResult) {
  return await bcrypt.compare(password, hashResult);
}

// Serviço responsável por lidar com senhas
// - transformar senha em hash no cadastro
// - comparar senha em texto com hash salvo
// Este serviço NÃO acessa banco de dados
// Este serviço NÃO gera token (JWT)
