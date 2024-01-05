import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { LinkPresenter } from '../../presenters/link.presenter';
import {
  GetLinkByIdBadRequestRouteResponse,
  GetLinkByIdOkResponse,
} from './responses';
import { LinkIdParamType, linkIdParamSchema } from './schemas';
import { GetLinkByIdUseCase } from '@/domain/use-cases/get-link-by-id';
import { Public } from '@/infra/auth/public';

@ApiTags('LINKS')
@Public()
@Controller('links/:linkId')
export class GetLinkByIdController {
  constructor(private readonly getLinkByIdUseCase: GetLinkByIdUseCase) {}

  @ApiParam({
    name: 'linkId',
    schema: zodToOpenAPI(linkIdParamSchema),
  })
  @ApiOkResponse({
    type: GetLinkByIdOkResponse,
  })
  @ApiBadRequestResponse({
    type: GetLinkByIdBadRequestRouteResponse,
  })
  @Get('/')
  async handle(
    @Param('linkId', new ZodValidationPipe(linkIdParamSchema))
    linkId: LinkIdParamType,
  ): Promise<GetLinkByIdOkResponse> {
    const { link } = await this.getLinkByIdUseCase.execute({
      linkId,
    });

    return { link: LinkPresenter.toHttp(link) };
  }
}
