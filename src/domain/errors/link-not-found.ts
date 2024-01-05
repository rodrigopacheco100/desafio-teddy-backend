import { AppError } from '@/core/app-error';

export class LinkNotFoundError extends AppError {
  constructor() {
    super('Link not found');
  }
}
