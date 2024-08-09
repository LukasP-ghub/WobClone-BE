import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { DiscountsModule } from './discounts/discounts.module';
import { EbooksModule } from './ebooks/ebooks.module';
import { OrdersModule } from './orders/orders.module';
import { PublishersModule } from './publishers/publishers.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
         //synchronize: true,
        };
      },
    }),

   // TypeOrmModule.forRoot(TYPEORM_CONFIG),
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
  constructor(private dataSource: DataSource,
    private configService: ConfigService
  ) { }
}
