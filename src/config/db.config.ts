import { registerAs } from '@nestjs/config';
import process from 'node:process';

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  synchronize: process.env.DB_SYNC === 'true',
  autoLoadEntities: process.env.DB_AUTOLOAD === 'true',
}))
