import { Injectable } from '@nestjs/common';

import { CodeGenerator } from '../cryptography/code-generator';
import { Link } from '../entities/link';
import { UserNotFoundError } from '../errors/user-not-found';
import { LinkRepository } from '../repositories/link.repository';
import { UserRepository } from '../repositories/user.repository';

interface ShortenUrlUseCaseRequest {
  fullUrl: string;
  userId?: string;
}

interface ShortenUrlUseCaseResponse {
  id: string;
  shortenedUrl: string;
}

@Injectable()
export class ShortenUrlUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly linkRepository: LinkRepository,
    private readonly codeGenerator: CodeGenerator,
  ) {}

  async execute({
    fullUrl,
    userId,
  }: ShortenUrlUseCaseRequest): Promise<ShortenUrlUseCaseResponse> {
    if (userId) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new UserNotFoundError();
      }
    }

    const urlWasAlreadyShortened =
      await this.linkRepository.findByFullUrl(fullUrl);

    if (urlWasAlreadyShortened) {
      return {
        id: urlWasAlreadyShortened.id,
        shortenedUrl: urlWasAlreadyShortened.shortenedUrl,
      };
    }

    const shortenedCode = await this.generateLinkCode();

    const newLink = Link.create({
      fullUrl,
      shortenedCode,
      userId: userId ?? null,
    });

    await this.linkRepository.save(newLink);

    return {
      id: newLink.id,
      shortenedUrl: newLink.shortenedUrl,
    };
  }

  private generationTries = 0;
  private async generateLinkCode(): Promise<string> {
    this.generationTries++;

    const shortenedCode = await this.codeGenerator.generate();

    const shortenedCodeAlreadyUsed =
      await this.linkRepository.findByShortenedCode(shortenedCode);

    if (shortenedCodeAlreadyUsed) {
      if (this.generationTries > 10) {
        throw new Error('Too many tries while generating a new link code');
      }

      return await this.generateLinkCode();
    }

    return shortenedCode;
  }
}
