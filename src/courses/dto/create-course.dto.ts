import { IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @Length(3, 200, { message: 'Title must be between 3 and 200 characters' })
  title: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(5000, { message: 'Description cannot exceed 5000 characters' })
  description: string;
}
