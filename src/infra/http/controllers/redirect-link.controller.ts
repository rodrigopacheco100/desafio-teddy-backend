import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { AccessLinkUseCase } from '@/domain/use-cases/access-link';
import { Public } from '@/infra/auth/public';

const shortenedCodeParamSchema = z.string();

type ShortenedCodeParamType = z.infer<typeof shortenedCodeParamSchema>;

@Public()
@Controller('/:shortenedCode')
export class RedirectLinkController {
  constructor(private readonly accessLinkUseCase: AccessLinkUseCase) {}

  @Get('/')
  async handle(
    @Param('shortenedCode', new ZodValidationPipe(shortenedCodeParamSchema))
    shortenedCode: ShortenedCodeParamType,
    @Res() response: Response,
  ) {
    const { link } = await this.accessLinkUseCase.execute({
      shortenedCode,
    });

    response.redirect(link.fullUrl);
  }
}
