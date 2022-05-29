import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
  imports: [TypeOrmModule.forFeature([Report])]
})
export class ReportsModule {}
