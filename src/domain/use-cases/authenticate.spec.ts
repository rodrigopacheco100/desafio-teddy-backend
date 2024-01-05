import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { FakePasswordHasher } from 'test/cryptography/fake-password-hasher';
import { FakeUserRepository } from 'test/repositories/fake-user.repository';

import { User } from '../entities/user';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { AuthenticateUseCase } from './authenticate';

let userRepository: FakeUserRepository;
let passwordHasher: FakePasswordHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateUseCase;

describe(AuthenticateUseCase.name, () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    passwordHasher = new FakePasswordHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateUseCase(userRepository, encrypter, passwordHasher);
  });

  it('should be able to authenticate', async () => {
    const user = User.create({
      email: 'user@example.com',
      password: await passwordHasher.hash('password'),
    });

    userRepository.users.push(user);

    const result = await sut.execute({
      email: 'user@example.com',
      password: 'password',
    });

    expect(result.accessToken).toEqual(expect.any(String));
  });

  it('should not be able to authenticate an user with wrong email', async () => {
    const user = User.create({
      email: 'user@example.com',
      password: await passwordHasher.hash('password'),
    });

    userRepository.users.push(user);

    await expect(
      sut.execute({
        email: 'user123@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const user = User.create({
      email: 'user@example.com',
      password: await passwordHasher.hash('password'),
    });

    userRepository.users.push(user);

    await expect(
      sut.execute({
        email: 'user@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
