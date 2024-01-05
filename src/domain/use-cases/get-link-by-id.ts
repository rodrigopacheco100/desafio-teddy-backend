import { Injectable } from '@nestjs/common';

import { type Link } from '../entities/link';
import { LinkNotFoundError } from '../errors/link-not-found';
import { LinkRepository } from '../repositories/link.repository';

interface GetLinkByIdUseCaseRequest {
  linkId: string;
}

interface GetLinkByIdUseCaseResponse {
  link: Link;
}

@Injectable()
export class GetLinkByIdUseCase {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute({
    linkId,
  }: GetLinkByIdUseCaseRequest): Promise<GetLinkByIdUseCaseResponse> {
    const link = await this.linkRepository.findById(linkId);

    if (!link) {
      throw new LinkNotFoundError();
    }

    return {
      link,
    };
  }
}
