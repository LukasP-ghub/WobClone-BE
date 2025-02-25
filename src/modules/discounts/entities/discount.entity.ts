import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  discount_id: string;

  @Column({
    nullable: false,
    length: 150,
  })
  discount_name: string

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: true,
  })
  discount_value: number;

}
