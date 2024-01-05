import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  type EncryptOptions,
  type Encrypter,
} from '@/domain/cryptography/encrypter';
import { InvalidTokenError } from '@/domain/errors/invalid-token';

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private readonly jwtService: JwtService) {}
  async verify<T extends object>(token: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token);
    } catch (error) {
      throw new InvalidTokenError();
    }
  }

  async encrypt(
    payload: Record<string, unknown>,
    { expiresIn }: EncryptOptions = { expiresIn: '1d' },
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
    });
  }
}
