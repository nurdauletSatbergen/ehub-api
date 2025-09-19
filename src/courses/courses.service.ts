import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { GetCoursesDto } from './dto/get-courses.dto';
import { paginateRaw } from 'nestjs-typeorm-paginate';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>
  ) {}

  create(createCourseDto: CreateCourseDto, user: User) {
    const course = this.courseRepo.create(createCourseDto);
    course.author = user;
    return this.courseRepo.save(course)
  }

  findAll({ search, from, to, page = 1, limit = 10 }: GetCoursesDto) {
    const qb = this.courseRepo.createQueryBuilder('course');
    if (search) {
      qb.andWhere('course.title ILIKE :search OR course.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (from) {
      qb.andWhere('course.createdAt >= :from', { from });
    }

    if (to) {
      qb.andWhere('course.createdAt <= :to', { to });
    }

    qb.orderBy('course.createdAt', 'DESC');

    return paginateRaw(qb, { page, limit });
  }

  async findOne(id: string) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found!`);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found!`);
    Object.assign(course, updateCourseDto);
    return this.courseRepo.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found!`);
    return this.courseRepo.remove(course);
  }
}
