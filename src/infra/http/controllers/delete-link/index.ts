import { Controller, Delete, Param, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { UnauthorizedResponse } from '../../common/responses';
import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { DeleteLinkBadRequestRouteResponse } from './responses';
import { LinkIdParamType, linkIdParamSchema } from './schemas';
import { DeleteLinkUseCase } from '@/domain/use-cases/delete-link';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

@ApiTags('LINKS')
@ApiBearerAuth()
@Controller('links/:linkId')
export class DeleteLinkController {
  constructor(private readonly deleteLinkUseCase: DeleteLinkUseCase) {}

  @ApiParam({
    name: 'linkId',
    schema: zodToOpenAPI(linkIdParamSchema),
  })
  @ApiNoContentResponse()
  @ApiBadRequestResponse({
    type: DeleteLinkBadRequestRouteResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @HttpCode(204)
  @Delete('/')
  async handle(
    @Param('linkId', new ZodValidationPipe(linkIdParamSchema))
    linkId: LinkIdParamType,
    @CurrentUser() user: UserPayload,
  ): Promise<void> {
    await this.deleteLinkUseCase.execute({
      linkId,
      userId: user.id,
    });
  }
}
