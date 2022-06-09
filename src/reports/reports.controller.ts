import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { IsAuth } from 'src/users/decorators/user-auth.decorator';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @IsAuth()
    @Post()
    public async createReport(@Body() body: CreateReportDto ){
        return await this.reportsService.createReport(body);
    }
}
