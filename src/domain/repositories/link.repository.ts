import { type Link } from '../entities/link';
import { type PaginationResult, type Pagination } from '@/core/pagination';

export abstract class LinkRepository {
  abstract save(link: Link): Promise<void>;
  abstract findById(id: string): Promise<Link | null>;
  abstract findByFullUrl(fullUrl: string): Promise<Link | null>;
  abstract findByShortenedCode(shortenedCode: string): Promise<Link | null>;
  abstract findManyByUserId(userId: string): Promise<Link[]>;
  abstract findManyByUserId(
    userId: string,
    pagination: Pagination,
  ): Promise<PaginationResult<Link>>;
}
