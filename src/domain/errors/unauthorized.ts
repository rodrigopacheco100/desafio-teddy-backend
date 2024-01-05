import { AppError } from '@/core/app-error';

export class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized');
  }
}
