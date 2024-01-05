import { type PasswordHasher } from '@/domain/cryptography/password-hasher';

export class FakePasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
