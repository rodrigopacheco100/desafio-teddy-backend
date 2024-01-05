import { ApiProperty } from '@nestjs/swagger';

import { LinkView } from '../../views/link.view';

export class FetchOwnLinksOkResponse {
  @ApiProperty()
  amountOfPages: number;

  @ApiProperty({
    isArray: true,
    type: LinkView,
  })
  links: LinkView[];
}
