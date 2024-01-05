import { Injectable } from '@nestjs/common';

import { PrismaUserMapper } from '../mappers/user.mapper';
import { PrismaService } from '../prisma.service';
import { type User } from '@/domain/entities/user';
import { type UserRepository } from '@/domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: PrismaUserMapper.toCreateOnPrisma(user),
      update: PrismaUserMapper.toUpdateOnPrisma(user),
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
