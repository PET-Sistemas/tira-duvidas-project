import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entities/question.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class QuestionTypeormRepository extends GenericRepository<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {
    super(questionRepository);
  }
}
