import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  author_id: string;

  @Column({
    nullable: false,
    length: 100,
  })
  author_name: string;
}
