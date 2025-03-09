import { TypeOrmModuleOptions } from '@nestjs/typeorm';

let TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  database: 'wobclone_test',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  bigNumberStrings: false,
  logging: true,
  synchronize: false,
};

// switch (process.env.NODE_ENV) {
//   case 'test':
//     Object.assign(TYPEORM_CONFIG, {
//       database: 'wobclone_test',
//     });
//     break;
//   case 'development':
//     Object.assign(TYPEORM_CONFIG, {
//       database: 'wobclone_test',
//     });
//     break;
//   case 'production':
//     Object.assign(TYPEORM_CONFIG, {
//       database: 'wobclone',
//     });
//     break;
//   default:
//     throw new Error('No database specified for this environment');
// }

export { TYPEORM_CONFIG };

