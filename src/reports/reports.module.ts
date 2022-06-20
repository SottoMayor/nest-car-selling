import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { VehicleDataService } from './vehicle-data.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, VehicleDataService],
  exports: [ReportsService],
  imports: [TypeOrmModule.forFeature([Report]), HttpModule]
})
export class ReportsModule {}
