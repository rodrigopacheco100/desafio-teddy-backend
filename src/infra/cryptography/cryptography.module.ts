import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';
import { ShortUniqueIdCodeGenerator } from './short-unique-id-code-generator';
import { CodeGenerator } from '@/domain/cryptography/code-generator';
import { Encrypter } from '@/domain/cryptography/encrypter';
import { PasswordHasher } from '@/domain/cryptography/password-hasher';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        return { secret: env.get('JWT_SECRET') };
      },
    }),
  ],
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: PasswordHasher, useClass: BcryptHasher },
    { provide: CodeGenerator, useClass: ShortUniqueIdCodeGenerator },
  ],
  exports: [Encrypter, PasswordHasher, CodeGenerator],
})
export class CryptographyModule {}
