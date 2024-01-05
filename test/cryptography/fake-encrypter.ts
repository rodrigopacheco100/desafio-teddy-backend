import { type Encrypter } from '@/domain/cryptography/encrypter';

export class FakeEncrypter implements Encrypter {
  async verify<T extends object>(token: string): Promise<T> {
    return JSON.parse(token);
  }

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
