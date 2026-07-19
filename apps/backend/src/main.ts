import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { PinoLoggerService } from './common/logger/pino-logger.service';

async function bootstrap(): Promise<void> {
  const logger = new PinoLoggerService();
  const app = await NestFactory.create(AppModule, { logger });

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('environment', 'development');
  const port = configService.get<number>('port', 3000);

  // 1. Configure strict prefix mapping: /api/v1/
  app.setGlobalPrefix('api/v1');

  // 2. Security Middlewares
  app.use(helmet());
  app.enableCors({
    origin: true, // Configured for flexible frontend integration in dev
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
  });

  // 3. Global Filters and Interceptors
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 4. Global Input Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 400,
    }),
  );

  // 5. Open API (Swagger) Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('VoyageAI Authentication API')
    .setDescription(
      'Sprint 1 core authentication endpoints. Protect routes using access token JWTs.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Submit your Supabase access token in Authorization Bearer header',
        in: 'header',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);

  // 6. Start server
  await app.listen(port);
  logger.log(
    `VoyageAI Auth server bootstrapped successfully in [${environment}] mode on port [${port}].`,
  );
  logger.log(`Swagger documentation interface serving on: http://localhost:${port}/api/v1/docs`);
}

bootstrap();
