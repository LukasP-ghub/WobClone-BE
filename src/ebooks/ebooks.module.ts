import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { Ebook } from './entities/ebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook])],
  controllers: [EbooksController],
  providers: [EbooksService]
})
export class EbooksModule { }
