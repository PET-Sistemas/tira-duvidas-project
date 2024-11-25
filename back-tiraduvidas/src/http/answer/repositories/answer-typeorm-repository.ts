import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../entities/answer.entity';
import { GenericRepository } from '../../../utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class AnswerTypeormRepository extends GenericRepository<Answer> {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {
    super(answerRepository);
  }
}
