import { Test, TestingModule } from '@nestjs/testing';
import { VehicleDataService } from './vehicle-data.service';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

describe('VehicleDataService', () => {
  let service: VehicleDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleDataService, ConfigService, HttpService],
    }).compile();

    service = module.get<VehicleDataService>(VehicleDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
