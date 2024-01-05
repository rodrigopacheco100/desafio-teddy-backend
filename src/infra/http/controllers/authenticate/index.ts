import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import {
  AuthenticateBadRequestRouteResponse,
  AuthenticateCreatedRouteResponse,
} from './responses';
import { BodyType, bodySchema } from './schemas';
import { AuthenticateUseCase } from '@/domain/use-cases/authenticate';
import { Public } from '@/infra/auth/public';

@ApiTags('AUTH')
@Public()
@Controller('/sign-in')
export class AuthenticateController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  @ApiBody({
    schema: zodToOpenAPI(bodySchema),
  })
  @ApiCreatedResponse({
    type: AuthenticateCreatedRouteResponse,
  })
  @ApiBadRequestResponse({
    type: AuthenticateBadRequestRouteResponse,
  })
  @Post('/')
  async handle(
    @Body(new ZodValidationPipe(bodySchema)) body: BodyType,
  ): Promise<AuthenticateCreatedRouteResponse> {
    const { accessToken } = await this.authenticateUseCase.execute(body);

    return {
      accessToken,
    };
  }
}
