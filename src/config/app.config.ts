import { registerAs } from '@nestjs/config';
import process from 'node:process';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
}))
