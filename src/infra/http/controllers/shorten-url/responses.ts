import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlCreatedRouteResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: process.env.APP_BASE_URL + '/A7bc8Q' })
  shortenedUrl: string;
}
