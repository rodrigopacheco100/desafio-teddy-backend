import { ApiProperty } from '@nestjs/swagger';

import { EmailAlreadyUsedError } from '@/domain/errors/email-already-used';

export class RegisterBadRequestRouteResponse {
  @ApiProperty({
    example: 400,
  })
  statusCode: 400;

  @ApiProperty({
    example: new EmailAlreadyUsedError().message,
    examples: [new EmailAlreadyUsedError().message],
  })
  message: string;
}
