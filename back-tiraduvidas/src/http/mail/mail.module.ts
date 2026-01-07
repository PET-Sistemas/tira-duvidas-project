import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule,
    TypeOrmModule.forFeature([Mail]),
    UserModule,
    // MailerModule.forRootAsync({
    //   useFactory: async (config: ConfigService) => ({
    //     // Avoid connecting to localhost:587 when not using SMTP.
    //     // Use MAIL_PROVIDER=smtp to enable real SMTP. Otherwise use jsonTransport (no network).
    //     transport:
    //       (config.get('MAIL_PROVIDER') || 'resend').toLowerCase() === 'smtp'
    //         ? {
    //             host: config.get('MAIL_HOST') || 'localhost',
    //             port: Number(config.get('MAIL_PORT')) || 587,
    //             secure: String(config.get('MAIL_SECURE') || '').toLowerCase() === 'true',
    //             auth: {
    //               user: config.get('MAIL_USER'),
    //               pass: config.get('MAIL_PASSWORD'),
    //             },
    //           }
    //         : {
    //             jsonTransport: true,
    //           },
    //     defaults: {
    //       from: config.get('MAIL_FROM') || `"UFMS" <no-reply@example.com>`,
    //     },
    //     template: {
    //       dir: join(__dirname, 'templates'),
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [MailService, MailRepositoryTypeorm],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
