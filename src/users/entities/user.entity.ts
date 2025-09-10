import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false
  })
  firstName: string


  @Column({
    type: 'varchar',
    length: 96,
    nullable: false
  })
  lastName: string

  @Column({
    type: 'varchar',
    length: 254,
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
