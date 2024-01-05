import { ApiProperty } from '@nestjs/swagger';

import { LinkNotFoundError } from '@/domain/errors/link-not-found';

export class DeleteLinkBadRequestRouteResponse {
  @ApiProperty({
    example: 400,
  })
  statusCode: 400;

  @ApiProperty({
    example: new LinkNotFoundError().message,
    examples: [new LinkNotFoundError().message],
  })
  message: string;
}
