import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaLinkRepository } from './prisma/repositories/link.repository';
import { PrismaUserRepository } from './prisma/repositories/user.repository';
import { LinkRepository } from '@/domain/repositories/link.repository';
import { UserRepository } from '@/domain/repositories/user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: LinkRepository,
      useClass: PrismaLinkRepository,
    },
  ],
  exports: [PrismaService, UserRepository, LinkRepository],
})
export class DatabaseModule {}
