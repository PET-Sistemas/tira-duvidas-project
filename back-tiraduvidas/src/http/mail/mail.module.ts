import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from './mail.service';
import { Mail } from './entities/mail-typeorm.entity';
import { MailController } from './mail.controller';
import { UserModule } from '../user/user.module';
import { MailRepositoryTypeorm } from './repositories/mail.repository.typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mail]),
    UserModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"UFMS" <${config.get('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, MailRepositoryTypeorm],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
