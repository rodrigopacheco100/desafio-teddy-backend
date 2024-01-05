import { randomUUID } from 'crypto';
import { FakeLinkRepository } from 'test/repositories/fake-link.repository';

import { Link } from '../entities/link';
import { LinkNotFoundError } from '../errors/link-not-found';
import { UnauthorizedError } from '../errors/unauthorized';
import { DeleteLinkUseCase } from './delete-link';

let linkRepository: FakeLinkRepository;

let sut: DeleteLinkUseCase;

describe(DeleteLinkUseCase.name, () => {
  beforeEach(() => {
    linkRepository = new FakeLinkRepository();

    sut = new DeleteLinkUseCase(linkRepository);
  });

  it('should be able to delete a link', async () => {
    const link = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    linkRepository.links.push(link);

    await expect(
      sut.execute({
        linkId: link.id,
        userId: 'user-1',
      }),
    ).resolves.toBeUndefined();

    expect(linkRepository.links[0].deletedAt).toEqual(expect.any(Date));
    await expect(linkRepository.findById(link.id)).resolves.toBeNull();
  });

  it('should not be able to delete a non existing link', async () => {
    await expect(
      sut.execute({
        linkId: randomUUID(),
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(LinkNotFoundError);
  });

  it('should not be able to delete a link from another user', async () => {
    const link = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    linkRepository.links.push(link);

    await expect(
      sut.execute({
        linkId: link.id,
        userId: 'user-2',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError);
  });
});
