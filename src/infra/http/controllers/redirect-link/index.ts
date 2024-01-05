import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { zodToOpenAPI } from 'nestjs-zod';

import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { ShortenedCodeParamType, shortenedCodeParamSchema } from './schemas';
import { AccessLinkUseCase } from '@/domain/use-cases/access-link';
import { Public } from '@/infra/auth/public';

@ApiTags('REDIRECT LINK')
@Public()
@Controller('/:shortenedCode')
export class RedirectLinkController {
  constructor(private readonly accessLinkUseCase: AccessLinkUseCase) {}

  @ApiParam({
    name: 'shortenedCode',
    schema: zodToOpenAPI(shortenedCodeParamSchema),
  })
  @ApiResponse({
    description: 'Redirect to the original URL',
  })
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
