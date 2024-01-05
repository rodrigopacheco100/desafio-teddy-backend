import { Controller, Get, Param } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { LinkPresenter } from '../presenters/link.presenter';
import { GetLinkByIdUseCase } from '@/domain/use-cases/get-link-by-id';
import { Public } from '@/infra/auth/public';

const linkIdParamSchema = z.string().uuid();

type LinkIdParamType = z.infer<typeof linkIdParamSchema>;

@Public()
@Controller('links/:linkId')
export class GetLinkByIdController {
  constructor(private readonly getLinkByIdUseCase: GetLinkByIdUseCase) {}

  @Get('/')
  async handle(
    @Param('linkId', new ZodValidationPipe(linkIdParamSchema))
    linkId: LinkIdParamType,
  ) {
    const { link } = await this.getLinkByIdUseCase.execute({
      linkId,
    });

    return { link: LinkPresenter.toHttp(link) };
  }
}
