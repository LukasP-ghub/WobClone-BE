import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getTypeOrmConfig } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { EbooksModule } from './modules/ebooks/ebooks.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
   
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get('DB_HOST'),
    //     port: Number(configService.get('DB_PORT')), // upewnij się, że masz DB_PORT w .env
    //     username: configService.get('DB_USER'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: false, 
    //   }),
    // }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    //TypeOrmModule.forRoot(TYPEORM_CONFIG),
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
