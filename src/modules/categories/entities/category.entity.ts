import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({
    nullable: false,
    length: 30,
    unique: true
  })
  category_name: string;

  @Column({
    type: 'boolean'
  })
  popular: boolean;
}
