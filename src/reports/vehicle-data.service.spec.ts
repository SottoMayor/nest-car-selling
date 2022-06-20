import { Test, TestingModule } from '@nestjs/testing';
import { VehicleDataService } from './vehicle-data.service';

describe('VehicleDataService', () => {
  let service: VehicleDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleDataService],
    }).compile();

    service = module.get<VehicleDataService>(VehicleDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
