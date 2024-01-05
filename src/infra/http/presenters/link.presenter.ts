import { type Link } from '@/domain/entities/link';

export class LinkPresenter {
  static toHttp(link: Link) {
    return {
      id: link.id,
      numberOfAccesses: link.numberOfAccesses,
      fullUrl: link.fullUrl,
      shortenedUrl: link.shortenedUrl,
      createdAt: link.createdAt,
    };
  }
}
