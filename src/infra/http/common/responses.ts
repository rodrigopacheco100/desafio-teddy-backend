import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({ default: 401 })
  statusCode: 401;

  @ApiProperty({ default: 'Unauthorized' })
  message: 'Unauthorized';
}
