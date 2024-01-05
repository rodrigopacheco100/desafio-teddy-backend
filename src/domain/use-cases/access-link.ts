import { Injectable } from '@nestjs/common';

import { type Link } from '../entities/link';
import { LinkNotFoundError } from '../errors/link-not-found';
import { LinkRepository } from '../repositories/link.repository';

interface GetLinkByShortenedCodeUseCaseRequest {
  shortenedCode: string;
}

interface GetLinkByShortenedCodeUseCaseResponse {
  link: Link;
}

@Injectable()
export class AccessLinkUseCase {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute({
    shortenedCode,
  }: GetLinkByShortenedCodeUseCaseRequest): Promise<GetLinkByShortenedCodeUseCaseResponse> {
    const link = await this.linkRepository.findByShortenedCode(shortenedCode);

    if (!link) {
      throw new LinkNotFoundError();
    }

    link.registerAccess();

    await this.linkRepository.save(link);

    return {
      link,
    };
  }
}
