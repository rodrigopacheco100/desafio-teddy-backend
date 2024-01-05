import { FakePasswordHasher } from 'test/cryptography/fake-password-hasher';
import { FakeUserRepository } from 'test/repositories/fake-user.repository';

import { User } from '../entities/user';
import { EmailAlreadyUsedError } from '../errors/email-already-used';
import { RegisterUseCase } from './register';

let userRepository: FakeUserRepository;
let passwordHasher: FakePasswordHasher;

let sut: RegisterUseCase;

describe(RegisterUseCase.name, () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    passwordHasher = new FakePasswordHasher();

    sut = new RegisterUseCase(userRepository, passwordHasher);
  });

  it('should be able to register user', async () => {
    await sut.execute({
      email: 'user@example.com',
      password: 'password',
    });

    expect(userRepository.users[0]).toEqual(expect.any(User));
  });

  it('should not be able to register user with already used email', async () => {
    await sut.execute({
      email: 'user@example.com',
      password: 'password',
    });

    await expect(
      sut.execute({
        email: 'user@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyUsedError);
  });
});
