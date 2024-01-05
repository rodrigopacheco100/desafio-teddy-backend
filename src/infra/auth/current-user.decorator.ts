import { type ExecutionContext, createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';

import { type UserPayload } from './jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.user as UserPayload;
  },
);
