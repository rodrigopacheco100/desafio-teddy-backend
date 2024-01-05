import { FakeCodeGenerator } from 'test/cryptography/fake-code-generator';
import { FakeLinkRepository } from 'test/repositories/fake-link.repository';
import { FakeUserRepository } from 'test/repositories/fake-user.repository';

import { User } from '../entities/user';
import { ShortenUrlUseCase } from './shorten-url';

let linkRepository: FakeLinkRepository;
let userRepository: FakeUserRepository;
let codeGenerator: FakeCodeGenerator;

let sut: ShortenUrlUseCase;

describe(ShortenUrlUseCase.name, () => {
  beforeEach(() => {
    linkRepository = new FakeLinkRepository();
    userRepository = new FakeUserRepository();
    codeGenerator = new FakeCodeGenerator();

    sut = new ShortenUrlUseCase(userRepository, linkRepository, codeGenerator);
  });

  it('should be able to create shortened url without user', async () => {
    const result = await sut.execute({
      fullUrl: 'http://example.com',
    });

    expect(result.id).toEqual(expect.any(String));
    expect(result.shortenedUrl).toEqual(expect.any(String));
  });

  it('should be able to create shortened url with user', async () => {
    const user = User.create({
      email: 'user@example.com',
      password: 'password',
    });

    userRepository.users.push(user);

    const result = await sut.execute({
      userId: user.id,
      fullUrl: 'http://example.com',
    });

    expect(result.id).toEqual(expect.any(String));
    expect(result.shortenedUrl).toEqual(expect.any(String));
  });

  it('should be able to return the same link from already registered full url', async () => {
    const firstTry = await sut.execute({
      fullUrl: 'http://example.com',
    });

    const secondTry = await sut.execute({
      fullUrl: 'http://example.com',
    });

    expect(firstTry).toEqual(secondTry);
  });
});
