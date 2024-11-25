import { Injectable } from '@nestjs/common';
import { Answer } from './entities/answer.entity';
import { AnswerTypeormRepository } from './repositories/answer-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class AnswerService extends GenericService<
  Answer,
  AnswerTypeormRepository
> {}
