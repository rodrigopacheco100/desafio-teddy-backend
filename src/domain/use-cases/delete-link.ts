import { Injectable } from '@nestjs/common';

import { LinkNotFoundError } from '../errors/link-not-found';
import { UnauthorizedError } from '../errors/unauthorized';
import { LinkRepository } from '../repositories/link.repository';

interface DeleteLinkUseCaseRequest {
  linkId: string;
  userId: string;
}

@Injectable()
export class DeleteLinkUseCase {
  constructor(private readonly linkRepository: LinkRepository) {}

  async execute({ linkId, userId }: DeleteLinkUseCaseRequest): Promise<void> {
    const link = await this.linkRepository.findById(linkId);

    if (!link) {
      throw new LinkNotFoundError();
    }

    if (link.userId !== userId) {
      throw new UnauthorizedError();
    }

    link.delete();

    await this.linkRepository.save(link);
  }
}
