import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionTypeormRepository } from './repositories/question-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    QuestionTypeormRepository,
    {
      provide: QuestionService,
      useFactory: (userRepository: QuestionTypeormRepository) =>
        new QuestionService(userRepository),
      inject: [QuestionTypeormRepository],
    },
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
