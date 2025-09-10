import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): Omit<User, "password"> => {
    return context.switchToHttp().getRequest().user;
  }
)
