import { AppError } from '@/core/app-error';

export class UserNotFoundError extends AppError {
  constructor() {
    super('User not found');
  }
}
