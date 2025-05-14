import { Test, TestingModule } from '@nestjs/testing';
import { DentistsController } from './dentists.controller';

describe('DentistsController', () => {
  let controller: DentistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DentistsController],
    }).compile();

    controller = module.get<DentistsController>(DentistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
