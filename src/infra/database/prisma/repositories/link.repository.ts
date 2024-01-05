import { Injectable } from '@nestjs/common';

import { PrismaLinkMapper } from '../mappers/link.mapper';
import { PrismaService } from '../prisma.service';
import { type Pagination, type PaginationResult } from '@/core/pagination';
import { type Link } from '@/domain/entities/link';
import { type LinkRepository } from '@/domain/repositories/link.repository';

@Injectable()
export class PrismaLinkRepository implements LinkRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(link: Link): Promise<void> {
    await this.prisma.link.upsert({
      where: {
        id: link.id,
      },
      create: PrismaLinkMapper.toCreateOnPrisma(link),
      update: PrismaLinkMapper.toUpdateOnPrisma(link),
    });
  }

  async findById(id: string): Promise<Link | null> {
    const link = await this.prisma.link.findFirst({
      where: { id, deletedAt: null },
    });

    if (!link) return null;

    return PrismaLinkMapper.toDomain(link);
  }

  async findByFullUrl(fullUrl: string): Promise<Link | null> {
    const link = await this.prisma.link.findFirst({
      where: { fullUrl, deletedAt: null },
    });

    if (!link) return null;

    return PrismaLinkMapper.toDomain(link);
  }

  async findByShortenedCode(shortenedCode: string): Promise<Link | null> {
    const link = await this.prisma.link.findFirst({
      where: { shortenedCode, deletedAt: null },
    });

    if (!link) return null;

    return PrismaLinkMapper.toDomain(link);
  }

  findManyByUserId(userId: string): Promise<Link[]>;
  findManyByUserId(
    userId: string,
    pagination: Pagination,
  ): Promise<PaginationResult<Link>>;
  async findManyByUserId(
    userId: string,
    pagination?: Pagination,
  ): Promise<Link[] | PaginationResult<Link>> {
    const skip = pagination
      ? (pagination.page - 1) * pagination.quantityPerPage
      : undefined;

    const take = pagination ? pagination.quantityPerPage : undefined;

    const links = await this.prisma.link.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!pagination) {
      return links.map(PrismaLinkMapper.toDomain);
    }

    const amountOfLinks = await this.prisma.link.count({
      where: {
        userId,
        deletedAt: null,
      },
    });

    return {
      amountOfPages: Math.ceil(amountOfLinks / pagination.quantityPerPage),
      data: links.map(PrismaLinkMapper.toDomain),
    };
  }
}
