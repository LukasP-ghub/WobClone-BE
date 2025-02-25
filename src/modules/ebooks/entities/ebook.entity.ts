import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../../authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';
import { Discount } from '../../discounts/entities/discount.entity';
import { OrderItem } from '../../orders/entities/order_item.entity';
import { Cover } from './cover.entity';
import { Publisher } from './publisher.entity';

@Entity()
export class Ebook {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty(
    {
      type: String,
      description: 'The unique identifier of the ebook',
      example: '123e4567-e89b-12d3-a456-426614174000'
    }
  )
  ebook_id: string;

  @Column({
    nullable: false,
    length: 100,
  })
  @ApiProperty(
    {
      type: String,
      description: 'The title of the ebook',
      example: 'Test Ebook Title'
    }
  )
  title: string;

  @Column({
    type: 'int',
  })
  @ApiProperty(
    {
      type: Number,
      description: 'The number of pages in the ebook',
      example: 100
    }
  )
  pages: number;

  @Column({
    type: 'date',
    nullable: false,
  })
  @ApiProperty(
    {
      type: String,
      description: 'The publication date of the ebook',
      example: '2022-01-01'
    }
  )
  publication_date: string;

  @Column({
    type: 'text',
  })
  @ApiProperty(
    {
      type: String,
      description: 'The description of the ebook',
      example: 'This is a test ebook description'
    }
  )
  description: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  @ApiProperty(
    {
      type: Number,
      description: 'The price of the ebook',
      example: 20.99
    }
  )
  price: number;

  @Column({
    nullable: false,
    length: 20,
  })
  @ApiProperty(
    {
      type: String,
      description: 'The language name of the ebook',
      example: 'English'
    }
  )
  language_name: string

  @Column({
    length: 5,
    nullable: false,
  })
  @ApiProperty(
    {
      type: String,
      description: 'The language code of the ebook',
      example: 'en-EN'
    }
  )
  language_code: string;

  @Column({
    nullable: false,
  })
  @ApiProperty(
    {
      type: String,
      description: 'file name of the ebook',
      example: 'TestEbook.pdf'
    }
  )
  file: string;

  // @ManyToOne(() => EbookLanguage, (entity) => entity.ebook, { cascade: true })
  // @JoinColumn({ name: 'language' })
  // language: EbookLanguage;

  @ManyToOne(() => Publisher, (entity) => entity.ebook, { cascade: true })
  @JoinColumn({ name: 'publisher' })
  publisher: Publisher;

  @OneToMany(() => Cover, (entity) => entity.ebook_id, { cascade: true })
  cover: Cover[];

  @OneToMany(() => OrderItem, (entity) => entity.ebook)
  orderItem: OrderItem[]

  @ManyToMany(() => Author, { cascade: true })
  @JoinTable({
    name: 'ebook_author',
    joinColumn: {
      name: "ebook_id",
      referencedColumnName: "ebook_id"
    },
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "author_id"
    }
  })
  author: Author[];

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({
    name: 'ebook_category',
    joinColumn: {
      name: "ebook_id",
      referencedColumnName: "ebook_id"
    },
    inverseJoinColumn: {
      name: "category_id",
      referencedColumnName: "category_id"
    }
  })
  category: Category[];

  @ManyToMany(() => Discount, { cascade: true })
  @JoinTable({
    name: 'ebook_discount',
    joinColumn: {
      name: "ebook_id",
      referencedColumnName: "ebook_id"
    },
    inverseJoinColumn: {
      name: "discount_id",
      referencedColumnName: "discount_id"
    }
  })
  discount: Discount[];


}
