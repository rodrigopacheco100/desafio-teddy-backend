import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { ShortenUrlUseCase } from '@/domain/use-cases/shorten-url';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { type UserPayload } from '@/infra/auth/jwt.strategy';
import { Public } from '@/infra/auth/public';

const bodySchema = z.object({
  url: z.string().url(),
});

type BodyType = z.infer<typeof bodySchema>;

@Public()
@Controller('/links')
export class ShortenUrlController {
  constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) {}

  @Post('/')
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodyType,
    @CurrentUser() user: UserPayload | undefined,
  ) {
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
