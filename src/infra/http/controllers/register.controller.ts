import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { RegisterUseCase } from '@/domain/use-cases/register';
import { Public } from '@/infra/auth/public';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type BodyType = z.infer<typeof bodySchema>;

@Public()
@Controller('/sign-up')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('/')
  async handle(@Body(new ZodValidationPipe(bodySchema)) body: BodyType) {
    await this.registerUseCase.execute(body);
  }
}
