import { FakeLinkRepository } from 'test/repositories/fake-link.repository';

import { Link } from '../entities/link';
import { LinkNotFoundError } from '../errors/link-not-found';
import { AccessLinkUseCase } from './access-link';

let linkRepository: FakeLinkRepository;

let sut: AccessLinkUseCase;

describe(AccessLinkUseCase.name, () => {
  beforeEach(() => {
    linkRepository = new FakeLinkRepository();

    sut = new AccessLinkUseCase(linkRepository);
  });

  it('should be able to access a link', async () => {
    const link = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    linkRepository.links.push(link);

    const result = await sut.execute({
      shortenedCode: link.shortenedCode,
    });

    expect(result.link.numberOfAccesses).toEqual(1);
  });

  it('should not be able to access a non existing link', async () => {
    await expect(
      sut.execute({
        shortenedCode: 'test',
      }),
    ).rejects.toBeInstanceOf(LinkNotFoundError);
  });
});
