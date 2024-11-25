import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbackTypeormRepository } from './repositories/feedback-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Feedback])],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    FeedbackTypeormRepository,
    {
      provide: FeedbackService,
      useFactory: (userRepository: FeedbackTypeormRepository) =>
        new FeedbackService(userRepository),
      inject: [FeedbackTypeormRepository],
    },
  ],
  exports: [FeedbackService],
})
export class FeedbackModule {}
