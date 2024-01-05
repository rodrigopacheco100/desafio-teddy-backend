import { AppError } from '@/core/app-error';

export class InvalidTokenError extends AppError {
  constructor() {
    super('Invalid token provided');
  }
}
