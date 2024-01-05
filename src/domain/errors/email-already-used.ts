import { AppError } from '@/core/app-error';

export class EmailAlreadyUsedError extends AppError {
  constructor() {
    super('Email already used');
  }
}
