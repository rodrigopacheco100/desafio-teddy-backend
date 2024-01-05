import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { AuthenticateUseCase } from '@/domain/use-cases/authenticate';
import { Public } from '@/infra/auth/public';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type BodyType = z.infer<typeof bodySchema>;

@Public()
@Controller('/sign-in')
export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @Post('/')
  async handle(@Body(new ZodValidationPipe(bodySchema)) body: BodyType) {
    const { accessToken } = await this.authenticateUseCase.execute(body);

    return {
      accessToken,
    };
  }
}
