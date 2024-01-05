import { type Link as PrismaLink } from '@prisma/client';

import { Link } from '@/domain/entities/link';

export class PrismaLinkMapper {
  static toDomain(raw: PrismaLink): Link {
    return Link.from({
      id: raw.id,
      createdAt: raw.createdAt,
      deletedAt: raw.deletedAt,
      fullUrl: raw.fullUrl,
      numberOfAccesses: raw.numberOfAccesses,
      shortenedCode: raw.shortenedCode,
      updatedAt: raw.updatedAt,
      userId: raw.userId,
    });
  }

  static toUpdateOnPrisma(raw: Link): WithoutId<PrismaLink> {
    return {
      createdAt: raw.createdAt,
      deletedAt: raw.deletedAt,
      fullUrl: raw.fullUrl,
      numberOfAccesses: raw.numberOfAccesses,
      shortenedCode: raw.shortenedCode,
      updatedAt: raw.updatedAt,
      userId: raw.userId,
    };
  }

  static toCreateOnPrisma(raw: Link): PrismaLink {
    return {
      id: raw.id,
      ...this.toUpdateOnPrisma(raw),
    };
  }
}
