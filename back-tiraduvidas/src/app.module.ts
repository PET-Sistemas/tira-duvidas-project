import { Module } from '@nestjs/common';
import { UserModule } from './http/user/user.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailModule } from './http/mail/mail.module';
import { AnswerModule } from './http/answer/answer.module';
import { CategoryModule } from './http/category/category.module';
import { FeedbackModule } from './http/feedback/feedback.module';
import { QuestionModule } from './http/question/question.module';
import { UserRoleModule } from './http/user-role/user-role.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: Math.round(10 * 1000),
        limit: 1,
      },
    ]),
    UserModule,
    AuthModule,
    MailModule,
    AnswerModule,
    CategoryModule,
    FeedbackModule,
    QuestionModule,
    UserRoleModule,
  ],
  providers: [],
})
export class AppModule {}
