import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { IsAuth } from '../users/decorators/user-auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from 'src/users/users.entity';
import { Serealize } from 'src/interceptors/serealize.interceptor';
import { ReportsDto } from './dtos/Reports.dto';


@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService){}

    @IsAuth()
    @Post()
    @Serealize(ReportsDto)
    public async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return await this.reportsService.createReport(body, user);
    }
}
