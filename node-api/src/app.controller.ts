import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiIgnoreTransform } from './decorators/transform/api-ignore/api-ignore.decorator';
import { PublicApi } from './decorators';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`APP Check Default`)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {}

  @Get(['', 'health'])
  @ApiIgnoreTransform()
  @PublicApi()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('configurations/:key')
  @PublicApi()
  getConfig(@Param('key') key: string): string {
    return key && this.config.get(key, 'Unfound in env');
  }
}
