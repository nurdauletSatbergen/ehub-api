import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashingModule } from '../hashing/hashing.module';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    HashingModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
