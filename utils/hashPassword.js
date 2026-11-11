import bcrypt from "bcrypt";

export async function hashPassword(password) {
  const hashCrypt = await bcrypt.hash(password, 10);
  return hashCrypt;
}


export function comparePassword(password, hashResult) {
  return bcrypt.compare(password, hashResult);
}
