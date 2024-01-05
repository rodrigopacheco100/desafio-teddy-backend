import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { EnvModule } from '../env/env.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { DeleteLinkController } from './controllers/delete-link.controller';
import { FetchOwnLinksController } from './controllers/fetch-own-links.controller';
import { GetLinkByIdController } from './controllers/get-link-by-id.controller';
import { RedirectLinkController } from './controllers/redirect-link.controller';
import { RegisterController } from './controllers/register.controller';
import { ShortenUrlController } from './controllers/shorten-url.controller';
import { AccessLinkUseCase } from '@/domain/use-cases/access-link';
import { AuthenticateUseCase } from '@/domain/use-cases/authenticate';
import { DeleteLinkUseCase } from '@/domain/use-cases/delete-link';
import { GetLinkByIdUseCase } from '@/domain/use-cases/get-link-by-id';
import { GetPaginatedLinksByUserIdUseCase } from '@/domain/use-cases/get-paginated-links-by-user-id';
import { RegisterUseCase } from '@/domain/use-cases/register';
import { ShortenUrlUseCase } from '@/domain/use-cases/shorten-url';

@Module({
  imports: [AuthModule, EnvModule, DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    RegisterController,
    ShortenUrlController,
    DeleteLinkController,
    FetchOwnLinksController,
    GetLinkByIdController,

    // this controller must be the last one
    RedirectLinkController,
  ],
  providers: [
    AuthenticateUseCase,
    RegisterUseCase,
    ShortenUrlUseCase,
    AccessLinkUseCase,
    DeleteLinkUseCase,
    GetPaginatedLinksByUserIdUseCase,
    GetLinkByIdUseCase,
  ],
})
export class HttpModule {}
