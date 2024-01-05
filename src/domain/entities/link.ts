import { Entity } from '@/core/entity';

export interface LinkProps {
  fullUrl: string;
  shortenedCode: string;
  numberOfAccesses: number;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Link extends Entity<LinkProps> {
  get fullUrl() {
    return this.props.fullUrl;
  }

  get shortenedCode() {
    return this.props.shortenedCode;
  }

  get numberOfAccesses() {
    return this.props.numberOfAccesses;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  get shortenedUrl() {
    const APP_BASE_URL = process.env.APP_BASE_URL;

    return `${APP_BASE_URL}/${this.props.shortenedCode}`;
  }

  delete() {
    const now = new Date();
    this.props.updatedAt = now;
    this.props.deletedAt = now;
  }

  registerAccess() {
    this.props.numberOfAccesses++;
    this.props.updatedAt = new Date();
  }

  static create(
    props: TypedOmit<
      LinkProps,
      'createdAt' | 'deletedAt' | 'updatedAt' | 'numberOfAccesses'
    >,
  ) {
    const now = new Date();
    return new Link({
      ...props,
      numberOfAccesses: 0,
      updatedAt: now,
      createdAt: now,
      deletedAt: null,
    });
  }

  static from(props: WithId<LinkProps>) {
    return new Link(props);
  }
}
