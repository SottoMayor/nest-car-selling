import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ReportsService', () => {
  let service: ReportsService;
  let fakeReportRepository: Repository<Report>

  beforeEach(async () => {

    fakeReportRepository = {
      createQueryBuilder: () => {},
      create: () => {},
      save: () => {},
      findOne: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
            provide: Report,
            useValue: getRepositoryToken(Report)
        }
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
