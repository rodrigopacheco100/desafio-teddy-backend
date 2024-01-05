import { ApiProperty } from '@nestjs/swagger';

import { LinkView } from '../../views/link.view';
import { LinkNotFoundError } from '@/domain/errors/link-not-found';

export class GetLinkByIdOkResponse {
  @ApiProperty()
  @ApiProperty()
  link: LinkView;
}

export class GetLinkByIdBadRequestRouteResponse {
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
