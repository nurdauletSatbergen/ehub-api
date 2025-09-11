import {
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus, Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('sign-up')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@GetUser() user: Omit<User, "password">) {
    return this.authService.login(user);
  }

  // @UseGuards(JwtAuthGuard) we use global auth guard with JWT in auth.guard.ts that is why anymore need this
  @Get('profile')
  getProfile(@GetUser() user: Omit<User, "password">) {
    return user;
  }
}
