import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsPermissionService } from './collections.permission.service';

describe('CollectionsPermissionService', () => {
  let service: CollectionsPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionsPermissionService],
    }).compile();

    service = module.get<CollectionsPermissionService>(
      CollectionsPermissionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
