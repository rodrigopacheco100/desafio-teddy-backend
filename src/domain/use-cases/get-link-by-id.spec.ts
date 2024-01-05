import { randomUUID } from 'crypto';
import { FakeLinkRepository } from 'test/repositories/fake-link.repository';

import { Link } from '../entities/link';
import { LinkNotFoundError } from '../errors/link-not-found';
import { GetLinkByIdUseCase } from './get-link-by-id';

let linkRepository: FakeLinkRepository;

let sut: GetLinkByIdUseCase;

describe(GetLinkByIdUseCase.name, () => {
  beforeEach(() => {
    linkRepository = new FakeLinkRepository();

    sut = new GetLinkByIdUseCase(linkRepository);
  });

  it('should be able to get a link by id', async () => {
    const link = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    linkRepository.links.push(link);

    const result = await sut.execute({
      linkId: link.id,
    });

    expect(result.link).toEqual(link);
  });

  it('should not be able to get a non existing link', async () => {
    await expect(
      sut.execute({
        linkId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(LinkNotFoundError);
  });
});
