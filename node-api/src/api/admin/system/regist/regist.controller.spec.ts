import { Test, TestingModule } from '@nestjs/testing';
import { RegistController } from './regist.controller';

describe('RegistController', () => {
  let controller: RegistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistController],
    }).compile();

    controller = module.get<RegistController>(RegistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
