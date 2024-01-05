import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';

import { UnauthorizedResponse } from '../../common/responses';
import { ZodValidationPipe } from '../../pipes/zod-validator.pipe';
import { LinkPresenter } from '../../presenters/link.presenter';
import { FetchOwnLinksOkResponse } from './responses';
import { QuerySchemaType, querySchema } from './schemas';
import { GetPaginatedLinksByUserIdUseCase } from '@/domain/use-cases/get-paginated-links-by-user-id';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

@ApiTags('LINKS')
@ApiBearerAuth()
@Controller('links')
export class FetchOwnLinksController {
  constructor(
    private readonly getPaginatedLinksByUserIdUseCase: GetPaginatedLinksByUserIdUseCase,
  ) {}

  @ApiQuery({
    name: 'pagination',
    schema: zodToOpenAPI(querySchema),
  })
  @ApiOkResponse({
    type: FetchOwnLinksOkResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @Get('/')
  async handle(
    @Query(new ZodValidationPipe(querySchema))
    { page, quantityPerPage }: QuerySchemaType,
    @CurrentUser() user: UserPayload,
  ): Promise<FetchOwnLinksOkResponse> {
    const { links, amountOfPages } =
      await this.getPaginatedLinksByUserIdUseCase.execute({
        userId: user.id,
        page,
        quantityPerPage,
      });

    return { amountOfPages, links: links.map(LinkPresenter.toHttp) };
  }
}
