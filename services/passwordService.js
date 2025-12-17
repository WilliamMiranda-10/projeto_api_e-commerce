import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const hashCrypt = await bcrypt.hash(password, 10);
  return hashCrypt;
}

export async function comparePassword(password, hashResult) {
  return await bcrypt.compare(password, hashResult);
}

// primeiro vamos importar as bibliotecas

// receber a senha e transformar elas hash quando um usuario se cadastrar

// quando for fazer login vou pegar essa senha e comparar ela com hash que foi salvo no banco sem acessar o banco,
// usando o bcrypt se der True (verdadeiro)

// se der true vai gerar um token

// Serviço responsável por lidar com senhas
// - transformar senha em hash no cadastro
// - comparar senha em texto com hash salvo
// Este serviço NÃO acessa banco de dados
// Este serviço NÃO gera token (JWT)
