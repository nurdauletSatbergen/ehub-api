import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BcryptHashingService } from '../hashing/bcrypt-hashing.service';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: BcryptHashingService,
    @Inject(jwtConfig.KEY) private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && await this.hashingService.compare(pass, user.password)) {
      const { password, ...props } = user;
      return props;
    }

    return null;
  }

  login(user: Omit<User, "password">) {
    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: this.config.accessTokenTtl }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: this.config.refreshTokenTtl, secret: this.config.refreshSecret })
    }
  }

}
