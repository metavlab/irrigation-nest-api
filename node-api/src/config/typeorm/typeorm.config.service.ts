import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST', '127.0.0.1'),
      port: this.configService.get<number>('DB_PORT', 3306),
      database: this.configService.get<string>('DB_DATABASE'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      timezone: '+08:00', // 东八区
      cache: {
        duration: 60000, // 1分钟的缓存
      },
      extra: {
        poolMax: 32,
        poolMin: 16,
        queueTimeout: 60000,
        pollPingInterval: 60, // 每隔60秒连接
        pollTimeout: 60, // 连接有效60秒
      },
    };
  }
}
