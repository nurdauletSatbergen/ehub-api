import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.interface';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptHashingService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(data: string | Buffer, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
}
