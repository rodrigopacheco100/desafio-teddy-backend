import { Injectable } from '@nestjs/common';

import { type Link } from '../entities/link';
import { LinkRepository } from '../repositories/link.repository';

interface GetPaginatedLinksByUserIdUseCaseRequest {
  userId: string;
  page: number;
  quantityPerPage: number;
}

interface GetPaginatedLinksByUserIdUseCaseResponse {
  links: Link[];
  amountOfPages: number;
}

@Injectable()
export class GetPaginatedLinksByUserIdUseCase {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute({
    userId,
    page,
    quantityPerPage,
  }: GetPaginatedLinksByUserIdUseCaseRequest): Promise<GetPaginatedLinksByUserIdUseCaseResponse> {
    const { data, amountOfPages } = await this.linkRepository.findManyByUserId(
      userId,
      {
        page,
        quantityPerPage,
      },
    );

    return {
      links: data,
      amountOfPages,
    };
  }
}
