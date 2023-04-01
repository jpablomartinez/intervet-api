import { env } from '../infrastructure/configuration/environment';
import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const hash = bcrypt.hash(password, parseInt(env.bcrypt_salt_rounds!));
  return hash;
};

export const validatePassword = async (
  hashValue: string,
  userPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(userPassword, hashValue);
};
