import bcrypt from 'bcrypt';

export async function encryptPassword(password){
  return  await bcrypt.hash(password, 10);
}

export function checkHash(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
