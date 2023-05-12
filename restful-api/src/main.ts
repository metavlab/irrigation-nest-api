import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appGlobalPrefix = configService.get<string>('APP_PREFIX', '');
  app.setGlobalPrefix(appGlobalPrefix);

  const appPort = configService.get<number>('PORT', 3000);
  await app.listen(appPort);

  Logger.log(
    'App is running in ' +
      ' stage,and it is listening at : \n' +
      `http://localhost:${appPort}/${appGlobalPrefix}/`,
  );
}
bootstrap();
