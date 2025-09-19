import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto/pagination.dto';

class GetCoursesDtoBase {
  @IsString()
  @IsOptional()
  search?: string;

  @IsDateString({}, { message: 'from must be a valid ISO date string' })
  @IsOptional()
  from?: string;

  @IsDateString({}, { message: 'to must be a valid ISO date string' })
  @IsOptional()
  to?: string;
}

export class GetCoursesDto extends IntersectionType(GetCoursesDtoBase, PaginationDto) {}
