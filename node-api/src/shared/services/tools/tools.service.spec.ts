import { Test, TestingModule } from '@nestjs/testing';
import { ToolsService } from './tools.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('ToolsService', () => {
  let service: ToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ToolsService, ConfigService],
    }).compile();

    service = module.get<ToolsService>(ToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('password should encrypt password', async () => {
    const en = await service.encrptPassword('admin!123');
    expect(en).toMatch(/^\$2b\$[\d]{1,2}\$\S+$/);
  });
});
