import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { COOKIE_SECRET } from './config/secrets';
import { AllExceptionsFilter } from './filters/allExceptionFilter.filter';
import { SanitizeInterceptor } from './interceptors/sanitize.interceptor';

export const setupApp = (app: any) => {
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    }
  }));

  app.use(helmet());
  
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-abc123'"], 
        objectSrc: ["'none'"], 
        upgradeInsecureRequests: [],
      },
    }),
  );

  app.useGlobalInterceptors(new SanitizeInterceptor());
  
  const config = new DocumentBuilder()
    .setTitle('Ebook store API description')
    .setDescription('Description of the API for the ebook store application')
    .setVersion('0.5')
    .addTag('ebooks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(cookieParser(COOKIE_SECRET));
  app.getHttpServer().setTimeout(10000);
}