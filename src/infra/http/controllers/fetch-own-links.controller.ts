import { Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { LinkPresenter } from '../presenters/link.presenter';
import { GetPaginatedLinksByUserIdUseCase } from '@/domain/use-cases/get-paginated-links-by-user-id';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

const querySchema = z.object({
  page: z.coerce.number().positive().int(),
  quantityPerPage: z.coerce.number().positive().int(),
});

type QuerySchemaType = z.infer<typeof querySchema>;

@Controller('links')
export class FetchOwnLinksController {
  constructor(
    private readonly getPaginatedLinksByUserIdUseCase: GetPaginatedLinksByUserIdUseCase,
  ) {}

  @Get('/')
  async handle(
    @Query(new ZodValidationPipe(querySchema))
    { page, quantityPerPage }: QuerySchemaType,
    @CurrentUser() user: UserPayload,
  ) {
    const { links, amountOfPages } =
      await this.getPaginatedLinksByUserIdUseCase.execute({
        userId: user.id,
        page,
        quantityPerPage,
      });

    return { amountOfPages, links: links.map(LinkPresenter.toHttp) };
  }
}
