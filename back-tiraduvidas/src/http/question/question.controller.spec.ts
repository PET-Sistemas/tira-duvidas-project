import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionTypeormRepository } from './repositories/question-typeorm-repository';
import { Question } from './entities/question.entity';

describe('QuestionController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            Question,
            QuestionTypeormRepository
          }
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
