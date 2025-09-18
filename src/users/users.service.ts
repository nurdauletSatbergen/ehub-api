import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptHashingService } from '../hashing/bcrypt-hashing.service';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hashingService: BcryptHashingService
  ) {}

  async create({ password, ...props }: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(props.email);
    if (user) throw new BadRequestException(`User with email ${props.email} already exists!`);
    password =  await this.hashingService.hash(password);
    const newUser = this.userRepo.create({ ...props, password });
    return this.userRepo.save(newUser);
  }

  findAll() {
    return paginate(this.userRepo, { page: 1, limit: 1 });
  }

  findOne(id: string) {
    return this.userRepo.findOne({
      where: { id }
    })
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User not found!`);
    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User not found!`);
    return this.userRepo.remove(user);
  }
}
