import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Answer } from '../answer/entities/answer.entity';
import { User } from '../user/entities/user.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { ReportTypeormRepository } from './repositories/report-typeorm-repository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Report, User, Answer])],
  controllers: [ReportController],
  providers: [
    ReportTypeormRepository,
    {
      provide: ReportService,
      useFactory: (
        reportRepository: ReportTypeormRepository,
        userRepository: Repository<User>,
      ) => new ReportService(reportRepository, userRepository),
      inject: [ReportTypeormRepository, getRepositoryToken(User)],
    },
  ],
  exports: [ReportService],
})
export class ReportModule {}
