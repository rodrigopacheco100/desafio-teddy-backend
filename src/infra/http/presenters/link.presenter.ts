import { type LinkView } from '../views/link.view';
import { type Link } from '@/domain/entities/link';

export class LinkPresenter {
  static toHttp(link: Link): LinkView {
    return {
      id: link.id,
      numberOfAccesses: link.numberOfAccesses,
      fullUrl: link.fullUrl,
      shortenedUrl: link.shortenedUrl,
      createdAt: link.createdAt,
    };
  }
}
