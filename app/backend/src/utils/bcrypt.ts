import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const createHash = (password: string): string => bcrypt.hashSync(password, SALT_ROUNDS);

const compareHash = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);

export default {
  createHash,
  compareHash,
};
