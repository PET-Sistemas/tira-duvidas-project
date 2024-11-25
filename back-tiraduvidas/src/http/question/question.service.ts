import { Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { QuestionTypeormRepository } from './repositories/question-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class QuestionService extends GenericService<
  Question,
  QuestionTypeormRepository
> {}
