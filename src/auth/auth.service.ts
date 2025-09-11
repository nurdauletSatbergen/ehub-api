import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BcryptHashingService } from '../hashing/bcrypt-hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingService: BcryptHashingService
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const isValid = await this.hashingService.compare(pass, user.password);
    if (!isValid) return null;
    const { password, ...props } = user;
    return props;
  }

  login(user: Omit<User, "password">) {
    const payload = { ...user };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
