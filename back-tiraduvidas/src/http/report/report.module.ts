import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { ReportTypeormRepository } from './repositories/report-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportController],
  providers: [
    ReportService,
    ReportTypeormRepository,
    {
      provide: ReportService,
      useFactory: (reportRepository: ReportTypeormRepository) =>
        new ReportService(reportRepository),
      inject: [ReportTypeormRepository],
    },
  ],
  exports: [ReportService],
})
export class ReportModule {}
