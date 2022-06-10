import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    public async createReport(body: CreateReportDto, user: User): Promise<Report> {
        const report = this.reportRepository.create(body);
        report.user = user;

        return await this.reportRepository.save(report);
    }
}
