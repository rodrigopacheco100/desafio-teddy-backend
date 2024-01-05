import { ApiProperty } from '@nestjs/swagger';

export class LinkView {
  @ApiProperty()
  id: string;

  @ApiProperty()
  numberOfAccesses: number;

  @ApiProperty()
  fullUrl: string;

  @ApiProperty()
  shortenedUrl: string;

  @ApiProperty()
  createdAt: Date;
}
