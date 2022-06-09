import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/CreateReport.dto';


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    public async createReport(body: CreateReportDto): Promise<Report> {
        const report = this.reportRepository.create(body);
        
        return await this.reportRepository.save(report);
    }
}
