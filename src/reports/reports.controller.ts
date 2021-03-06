import { Body, Controller, Patch, Post, Param, Query, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { VehicleDataService } from './vehicle-data.service';
import { CreateReportDto } from './dtos/CreateReport.dto';
import { IsAuth } from '../users/decorators/user-auth.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator'
import { User } from '../users/users.entity';
import { Serealize } from '../interceptors/serealize.interceptor';
import { ReportsDto } from './dtos/Reports.dto';
import { GetEstimateDto } from './dtos/GetEstimate.dto';
import { GetVehicleDataDto } from './dtos/GetVehicleData.dto';
import { IsAdmin } from '../guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';
import { GetVehicleDataDocs } from './decorators/docs/controller.decorator';


@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService, private vehicleDataService: VehicleDataService){}

    @GetVehicleDataDocs()
    @Get('/vehicle_data')
    public async getVehicleData(@Query() params: GetVehicleDataDto){
        return await this.vehicleDataService.getVehicleData(params);
    }

    @Get('/estimate')
    public async getEstimate(@Query() params: GetEstimateDto){
        return await this.reportsService.createEstimate(params);
    }

    @IsAuth()
    @Post()
    @Serealize(ReportsDto)
    public async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return await this.reportsService.createReport(body, user);
    }

    @IsAdmin()
    // Here we can, of course, put a body DTO. But, for 1 param in this way is very lean and clear to solve.
    @Patch('/:id')
    public async validateReport(@Body('approved') approved: boolean, @Param('id') id: string){
        const parsedId = parseInt(id);
        return await this.reportsService.validateReport(approved, parsedId);
    }
}
