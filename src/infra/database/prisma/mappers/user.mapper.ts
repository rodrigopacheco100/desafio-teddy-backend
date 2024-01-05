import { type User as PrismaUser } from '@prisma/client';

import { User } from '@/domain/entities/user';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.from({
      id: raw.id,
      email: raw.email,
      password: raw.password,
    });
  }

  static toUpdateOnPrisma(raw: User): WithoutId<PrismaUser> {
    return {
      email: raw.email,
      password: raw.password,
    };
  }

  static toCreateOnPrisma(raw: User): PrismaUser {
    return {
      id: raw.id,
      ...this.toUpdateOnPrisma(raw),
    };
  }
}
