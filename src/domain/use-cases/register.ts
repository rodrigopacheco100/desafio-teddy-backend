import { Injectable } from '@nestjs/common';

import { PasswordHasher } from '../cryptography/password-hasher';
import { User } from '../entities/user';
import { EmailAlreadyUsedError } from '../errors/email-already-used';
import { UserRepository } from '../repositories/user.repository';

interface RegisterUseCaseRequest {
  email: string;
  password: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute({ email, password }: RegisterUseCaseRequest): Promise<void> {
    const userWithEmail = await this.userRepository.findByEmail(email);

    if (userWithEmail) {
      throw new EmailAlreadyUsedError();
    }

    const newUser = User.create({
      email,
      password: await this.passwordHasher.hash(password),
    });

    await this.userRepository.save(newUser);
  }
}
