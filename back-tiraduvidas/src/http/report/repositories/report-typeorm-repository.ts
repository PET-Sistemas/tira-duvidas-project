import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

export class ReportTypeormRepository extends GenericRepository<Report> {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {
    super(reportRepository);
  }
}
