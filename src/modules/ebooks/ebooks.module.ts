import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { PublishersModule } from '../publishers/publishers.module';
import { EbooksController } from './ebooks.controller';
import { EbooksService } from './ebooks.service';
import { Ebook } from './entities/ebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook]),
  forwardRef(() => AuthorsModule),
  forwardRef(() => CategoriesModule),
  forwardRef(() => DiscountsModule),
  forwardRef(() => PublishersModule),
  ],
  exports: [EbooksService],
  controllers: [EbooksController],
  providers: [EbooksService]
})
export class EbooksModule { }
