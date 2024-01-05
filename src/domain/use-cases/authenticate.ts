import { Injectable } from '@nestjs/common';

import { Encrypter } from '../cryptography/encrypter';
import { PasswordHasher } from '../cryptography/password-hasher';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { UserRepository } from '../repositories/user.repository';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  accessToken: string;
}

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isSamePassword = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isSamePassword) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({
      id: user.id,
    });

    return { accessToken };
  }
}
