import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { ShortenUrlCreatedRouteResponse } from './responses';
import { bodySchema, BodyType } from './schemas';
import { ShortenUrlUseCase } from '@/domain/use-cases/shorten-url';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { type UserPayload } from '@/infra/auth/jwt.strategy';
import { Public } from '@/infra/auth/public';

@ApiTags('LINKS')
@ApiBearerAuth()
@Public()
@Controller('/links')
export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  @ApiBody({
    schema: zodToOpenAPI(bodySchema),
  })
  @ApiCreatedResponse({
    type: ShortenUrlCreatedRouteResponse,
  })
  @Post('/')
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodyType,
    @CurrentUser() user: UserPayload | undefined,
  ): Promise<ShortenUrlCreatedRouteResponse> {
    const { id, shortenedUrl } = await this.shortenUrlUseCase.execute({
      fullUrl: body.url,
      userId: user?.id,
    });

    return {
      id,
      shortenedUrl,
    };
  }
}
