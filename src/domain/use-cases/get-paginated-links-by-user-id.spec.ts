import { FakeLinkRepository } from 'test/repositories/fake-link.repository';

import { Link } from '../entities/link';
import { GetPaginatedLinksByUserIdUseCase } from './get-paginated-links-by-user-id';

let linkRepository: FakeLinkRepository;

let sut: GetPaginatedLinksByUserIdUseCase;

describe(GetPaginatedLinksByUserIdUseCase.name, () => {
  beforeEach(() => {
    linkRepository = new FakeLinkRepository();

    sut = new GetPaginatedLinksByUserIdUseCase(linkRepository);
  });

  it('should be able to get a link by id', async () => {
    const link1 = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    const link2 = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-2',
    });

    const link3 = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    const link4 = Link.create({
      fullUrl: 'http://example.com',
      shortenedCode: 'ABCDEF',
      userId: 'user-1',
    });

    linkRepository.links.push(link1, link2, link3, link4);

    const result = await sut.execute({
      userId: 'user-1',
      page: 1,
      quantityPerPage: 2,
    });

    expect(result.amountOfPages).toEqual(2);
    expect(result.links).toEqual([
      expect.objectContaining({
        userId: 'user-1',
      }),
      expect.objectContaining({
        userId: 'user-1',
      }),
    ]);
  });
});
