import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './config/typeorm/typeorm.config.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './api/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: (process.env.STAGE
        ? [`.env.${process.env.STAGE}`]
        : []
      ).concat(['.env']),
      validationSchema: configValidationSchema,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    SharedModule,
    CommonModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
