import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: Omit<User, "password">) {
    return user;
  }
}
