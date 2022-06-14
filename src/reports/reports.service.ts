import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { User } from 'src/users/users.entity';
import { GetEstimateDto } from './dtos/GetEstimate.dto';


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    public async createEstimate(estimateDto: GetEstimateDto){
        return await this.reportRepository.createQueryBuilder()
        .select('AVG(price)', 'estimated_price')
        .where('make = :make', { make: estimateDto.make })
        .andWhere('model = :model', { model: estimateDto.model})
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng})
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat})
        .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year})
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({mileage: estimateDto.mileage})
        .limit(3)
        .getRawOne()
    }

    public async createReport(body: CreateReportDto, user: User): Promise<Report> {
        const report = this.reportRepository.create(body);
        report.user = user;

        return await this.reportRepository.save(report);
    }

    public async validateReport(approved: boolean, id: number): Promise<Report>{
        // Verifying if approved is set, and if is a boolean
        if(!approved || typeof approved !== 'boolean'){
            throw new BadRequestException('Call this endpoint just if you wanna approve a report!');
        }

        const report = await this.reportRepository.findOne({ where: { id } });
        if(!report) {
            throw new NotFoundException('This report does not exist. Try again!')
        }

        report.approved = approved;

        return await this.reportRepository.save(report);

    }
}
