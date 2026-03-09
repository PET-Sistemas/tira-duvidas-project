import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/utils/generic-service.service';
import { Report } from './entities/report.entity';
import { ReportTypeormRepository } from './repositories/report-typeorm-repository';

@Injectable()
export class ReportService extends GenericService<
  Report,
  ReportTypeormRepository
> {}
