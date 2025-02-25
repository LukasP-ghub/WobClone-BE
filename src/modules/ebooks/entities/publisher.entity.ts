import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ebook } from './ebook.entity';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  publisher_id: string;

  @Column({
    nullable: false,
    length: 50,
  })
  publisher_name: string

  @OneToMany(() => Ebook, (entity) => entity.publisher)
  ebook: Ebook[]
}
