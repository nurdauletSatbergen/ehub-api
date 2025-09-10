import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      const { password, ...props } = user;
      return props;
    }

    return null;
  }

  login(user: Omit<User, "password">) {
    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
