import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmail(createUserDto.email);
    // TODO check if I use right exception type
    if (user) throw new BadRequestException(`User with email ${createUserDto.email} already exists!`);

    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
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
