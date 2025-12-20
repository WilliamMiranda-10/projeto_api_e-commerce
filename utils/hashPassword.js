import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const hashCrypt = await bcrypt.hash(password, 10);
  return hashCrypt;
}


export async function comparePassword(password, hashResult) {
  return await bcrypt.compare(password, hashResult);
}
