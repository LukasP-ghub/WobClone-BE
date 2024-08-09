import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { TYPEORM_CONFIG } from './config/typeOrm.config';
import { DiscountsModule } from './discounts/discounts.module';
import { EbooksModule } from './ebooks/ebooks.module';
import { OrdersModule } from './orders/orders.module';
import { PublishersModule } from './publishers/publishers.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    EbooksModule,
    AuthorsModule,
    CategoriesModule,
    DiscountsModule,
    UserModule,
    AuthModule,
    OrdersModule,
    PublishersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
