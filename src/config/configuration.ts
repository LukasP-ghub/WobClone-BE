import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 3306),
  username: configService.get<string>('DB_USER', 'root'),
  password: configService.get<string>('DB_PASSWORD', ''),
  database: configService.get<string>('DB_NAME', 'wobclone_test'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  bigNumberStrings: false,
  logging: configService.get<boolean>('DB_LOGGING', true),
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
});
