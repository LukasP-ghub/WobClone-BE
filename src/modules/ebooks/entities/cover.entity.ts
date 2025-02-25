import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ebook } from './ebook.entity';

@Entity()
export class Cover {
  @PrimaryGeneratedColumn('uuid')
  cover_id: string;

  @Column({
    nullable: false,
    length: 50,
  })
  cover_name: string;

  @Column()
  cover_size: number;

  @ManyToOne(() => Ebook, (entity) => entity.cover)
  @JoinColumn({ name: 'ebook_id' })
  ebook_id: Ebook;
}
