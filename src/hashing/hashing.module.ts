import { Module } from '@nestjs/common';
import { BcryptHashingService } from './bcrypt-hashing.service';

@Module({
  providers: [BcryptHashingService],
  exports: [BcryptHashingService]
})
export class HashingModule {}
