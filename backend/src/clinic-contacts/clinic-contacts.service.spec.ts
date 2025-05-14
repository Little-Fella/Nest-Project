import { Test, TestingModule } from '@nestjs/testing';
import { ClinicContactsService } from './clinic-contacts.service';

describe('ClinicContactsService', () => {
  let service: ClinicContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicContactsService],
    }).compile();

    service = module.get<ClinicContactsService>(ClinicContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
