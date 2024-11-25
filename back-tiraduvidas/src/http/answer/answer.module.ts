import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { AnswerTypeormRepository } from './repositories/answer-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    AnswerTypeormRepository,
    {
      provide: AnswerService,
      useFactory: (userRepository: AnswerTypeormRepository) =>
        new AnswerService(userRepository),
      inject: [AnswerTypeormRepository],
    },
  ],
  exports: [AnswerService],
})
export class AnswerModule {}
