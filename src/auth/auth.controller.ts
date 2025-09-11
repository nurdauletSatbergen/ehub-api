import {
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@GetUser() user: Omit<User, "password">) {
    return this.authService.login(user);
  }

  // @UseGuards(JwtAuthGuard) we use global auth guard with JWT in auth.guard.ts that is why anymore need this
  @Get('profile')
  getProfile(@GetUser() user: Omit<User, "password">) {
    return user;
  }
}
