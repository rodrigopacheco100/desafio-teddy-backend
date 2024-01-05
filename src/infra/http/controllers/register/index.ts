import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { RegisterBadRequestRouteResponse } from './responses';
import { bodySchema, BodyType } from './schemas';
import { RegisterUseCase } from '@/domain/use-cases/register';
import { Public } from '@/infra/auth/public';

@ApiTags('AUTH')
@Public()
@Controller('/sign-up')
export class RegisterController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @ApiBody({
    schema: zodToOpenAPI(bodySchema),
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    type: RegisterBadRequestRouteResponse,
  })
  @Post('/')
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodyType,
  ): Promise<void> {
    await this.registerUseCase.execute(body);
  }
}
