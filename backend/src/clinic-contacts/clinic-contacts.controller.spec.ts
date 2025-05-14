import { Test, TestingModule } from '@nestjs/testing';
import { ClinicContactsController } from './clinic-contacts.controller';

describe('ClinicContactsController', () => {
  let controller: ClinicContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicContactsController],
    }).compile();

    controller = module.get<ClinicContactsController>(ClinicContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
