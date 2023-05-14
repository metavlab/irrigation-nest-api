import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { FrontModule } from './modules/front/front.module';
import { ApiModule } from './api/api.module';
import { TypeormConfigService } from './config/typeorm/typeorm.config.service';

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
    AdminModule,
    FrontModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
