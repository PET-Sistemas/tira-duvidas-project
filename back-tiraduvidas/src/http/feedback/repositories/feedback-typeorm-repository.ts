import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from '../entities/feedback.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class FeedbackTypeormRepository extends GenericRepository<Feedback> {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {
    super(feedbackRepository);
  }
}
