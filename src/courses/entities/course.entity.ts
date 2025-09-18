import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'courses'
})
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;


}
