import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @MaxLength(96)
  firstName: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(1)
  @MaxLength(96)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsLowercase()
  @MaxLength(96)
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1
    },
    {
      message: 'Password is too easy!'
    }
  )
  @MaxLength(96, { message: 'Password is too long!'})
  password: string;
}
