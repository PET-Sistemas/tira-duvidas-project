import { Injectable } from '@nestjs/common';
import { Feedback } from './entities/feedback.entity';
import { FeedbackTypeormRepository } from './repositories/feedback-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class FeedbackService extends GenericService<
  Feedback,
  FeedbackTypeormRepository
> {}
