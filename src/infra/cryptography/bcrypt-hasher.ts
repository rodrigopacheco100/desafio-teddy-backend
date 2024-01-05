import { hash, compare } from 'bcryptjs';

import { type PasswordHasher } from '@/domain/cryptography/password-hasher';

export class BcryptHasher implements PasswordHasher {
  private readonly HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
}
