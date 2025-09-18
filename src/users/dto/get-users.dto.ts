import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetUsersDtoBase {
  @IsString()
  @IsOptional()
  search?: string;
}

export class GetUsersDto extends IntersectionType(GetUsersDtoBase, PaginationDto) {}
