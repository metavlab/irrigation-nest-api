import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './interceptors/biz.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import helmet from 'helmet';

const SWAGERR_ENABLE = process.env.NODE_DEV !== 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('PORT', 3000);
  const appGlobalPrefix = configService.get<string>('APP_PREFIX', '');

  //允许跨域请求
  app.enableCors();

  app.setGlobalPrefix(appGlobalPrefix);

  // Validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Filter Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger UI docs
  const options = new DocumentBuilder()
    .setTitle(`Node Api Documents`)
    .setDescription(`Nestjs server providing restful APIs`)
    .setBasePath(appGlobalPrefix)
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
    .setVersion(version || '0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  if (SWAGERR_ENABLE) {
    SwaggerModule.setup(`${appGlobalPrefix}/docs`, app, document);
    Logger.log(
      'App API Document \n' +
        `http://localhost:${appPort}/${appGlobalPrefix}/docs`,
    );
    SwaggerModule.setup('api-docs', app, document);
  } else {
    SwaggerModule.setup('api-docs', app, document);
  }

  // Web漏洞的
  app.use(helmet());
  await app.listen(appPort);

  Logger.log(
    'App is running in ' +
      ' stage,and it is listening at : \n' +
      `http://localhost:${appPort}/${appGlobalPrefix}/`,
  );
}
bootstrap();
