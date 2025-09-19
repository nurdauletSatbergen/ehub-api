import { IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto/pagination.dto';

class GetCoursesDtoBase {
  @IsString()
  @IsOptional()
  search?: string;
}

export class GetCoursesDto extends IntersectionType(GetCoursesDtoBase, PaginationDto) {}
