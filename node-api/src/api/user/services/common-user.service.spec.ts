import { Test, TestingModule } from '@nestjs/testing';
import { CommonUserService } from './common-user.service';

describe('CommonUserService', () => {
  let service: CommonUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonUserService],
    }).compile();

    service = module.get<CommonUserService>(CommonUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
