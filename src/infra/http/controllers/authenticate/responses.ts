import { ApiProperty } from '@nestjs/swagger';

import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials';

export class AuthenticateCreatedRouteResponse {
  @ApiProperty()
  accessToken: string;
}

export class AuthenticateBadRequestRouteResponse {
  @ApiProperty({
    example: 400,
  })
  statusCode: 400;

  @ApiProperty({
    example: new InvalidCredentialsError().message,
    examples: [new InvalidCredentialsError().message],
  })
  message: string;
}
