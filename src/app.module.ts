import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'node:process';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      load: [appConfig, dbConfig],
    }),
    UsersModule,
    AuthModule,
    CoursesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
