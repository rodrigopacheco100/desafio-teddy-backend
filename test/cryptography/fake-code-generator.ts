import SUID from 'short-unique-id';

import { type CodeGenerator } from '@/domain/cryptography/code-generator';

export class FakeCodeGenerator implements CodeGenerator {
  async generate(): Promise<string> {
    const suid = new SUID({ length: 6 });

    return suid.rnd();
  }
}
