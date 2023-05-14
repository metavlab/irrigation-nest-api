import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiIgnoreTransform } from './decorators/transform/api-ignore/api-ignore.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiIgnoreTransform()
  getHello(): string {
    return this.appService.getHello();
  }
}
