import { type Pagination, type PaginationResult } from '@/core/pagination';
import { type Link } from '@/domain/entities/link';
import { type LinkRepository } from '@/domain/repositories/link.repository';

export class FakeLinkRepository implements LinkRepository {
  public links: Link[] = [];

  async save(link: Link): Promise<void> {
    const linkIndex = this.links.findIndex((u) => u.id === link.id);

    if (linkIndex < 0) {
      this.links.push(link);
      return;
    }

    this.links[linkIndex] = link;
  }

  async findById(id: string): Promise<Link | null> {
    const link = this.links.find((link) => link.id === id && !link.deletedAt);

    if (!link) return null;

    return link;
  }

  async findByFullUrl(fullUrl: string): Promise<Link | null> {
    const link = this.links.find(
      (link) => link.fullUrl === fullUrl && !link.deletedAt,
    );

    if (!link) return null;

    return link;
  }

  async findByShortenedCode(shortenedCode: string): Promise<Link | null> {
    const link = this.links.find(
      (link) => link.shortenedCode === shortenedCode && !link.deletedAt,
    );

    if (!link) return null;

    return link;
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
    if (!pagination) {
      return this.links.filter((link) => link.userId === userId);
    }

    const amountOfLinks = this.links.filter(
      (link) => link.userId === userId && !link.deletedAt,
    ).length;

    const links = this.links
      .filter((link) => link.userId === userId && !link.deletedAt)
      .slice(
        (pagination.page - 1) * pagination.quantityPerPage,
        pagination.page * pagination.quantityPerPage,
      );

    return {
      amountOfPages: Math.ceil(amountOfLinks / pagination.quantityPerPage),
      data: links,
    };
  }
}
