import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './config/typeorm/typeorm.config.service';
import { ClsModule } from 'nestjs-cls';
import { CommonModule } from './core/common/common.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { UserSubcriber } from './interceptors/user.subscriber';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { AuthModule } from './core/auth/auth.module';

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
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    CommonModule,
    AuthModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UserSubcriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
