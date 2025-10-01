import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionTypeormRepository } from './repositories/question-typeorm-repository';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { CategoryTypeormRepository } from '../category/repositories/category-typeorm-repository';
import { Repository } from 'typeorm';
import { AnswerService } from '../answer/answer.service';
import { AnswerTypeormRepository } from '../answer/repositories/answer-typeorm-repository';
import { Answer } from '../answer/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category, Answer])],
  controllers: [QuestionController],
  providers: [
    {
      provide: QuestionService,
      useFactory: (userRepository: QuestionTypeormRepository) =>
        new QuestionService(userRepository),
      inject: [QuestionTypeormRepository],
    },
    QuestionTypeormRepository,
    {
      provide: CategoryService,
      useFactory: (userRepository: CategoryTypeormRepository) =>
        new CategoryService(userRepository),
      inject: [CategoryTypeormRepository],
    },
    CategoryTypeormRepository,
    {
      provide: AnswerService,
      useFactory: (userRepository: AnswerTypeormRepository) =>
        new AnswerService(userRepository),
      inject: [AnswerTypeormRepository],
    },
    AnswerTypeormRepository
  ],
  exports: [QuestionService, CategoryService],
})
export class QuestionModule {}
