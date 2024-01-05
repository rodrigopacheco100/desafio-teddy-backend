import { Controller, Delete, Param } from '@nestjs/common';
import { z } from 'zod';

import { ZodValidationPipe } from '../pipes/zod-validator.pipe';
import { DeleteLinkUseCase } from '@/domain/use-cases/delete-link';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';

const linkIdParamSchema = z.string().uuid();

type LinkIdParamType = z.infer<typeof linkIdParamSchema>;

@Controller('links/:linkId')
export class DeleteLinkController {
  constructor(private readonly deleteLinkUseCase: DeleteLinkUseCase) {}

  @Delete('/')
  async handle(
    @Param('linkId', new ZodValidationPipe(linkIdParamSchema))
    linkId: LinkIdParamType,
    @CurrentUser() user: UserPayload,
  ) {
    await this.deleteLinkUseCase.execute({
      linkId,
      userId: user.id,
    });
  }
}
