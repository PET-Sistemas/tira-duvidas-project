import { Injectable } from '@nestjs/common';
import { MailDataDto } from './dto/mail-data.dto';
import { MailRepositoryTypeorm } from './repositories/mail.repository.typeorm';
import { Mail } from './entities/mail-typeorm.entity';
import { SaveEmailDto } from './dto/save-email.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailRepo: MailRepositoryTypeorm) {}

  async userSignUp(mailData: MailDataDto<{ hash: string }>) {
    return;
  }

  async forgotPassword(mailData: MailDataDto<{ hash: string }>) {
    return;
  }

  async lastByEmailAndTemplate(email: string, templateName: string) {
    return await this.mailRepo.findLastMailByEmailAndTemplate(
      email,
      templateName,
    );
  }

  async findEmailById(mailId: number): Promise<Mail> {
    return this.mailRepo.findOneById(mailId);
  }

  async createEmail(data: SaveEmailDto) {
    await this.mailRepo.save(data);
  }

  async setEmailTransactionCodeAsUsed(mailId: number) {
    const mail = await this.mailRepo.findOneById(mailId);

    const additionalInformation = JSON.parse(mail.additionalInformation);
    additionalInformation.was_used = true;

    mail.additionalInformation = JSON.stringify(additionalInformation);

    await this.mailRepo.save(mail);
  }

  async updateEmailAttemptToUseTheCode(mailId: number) {
    const mail = await this.mailRepo.findOneById(mailId);

    const additionalInformation = JSON.parse(mail.additionalInformation);
    additionalInformation.usage_attempts += 1;

    mail.additionalInformation = JSON.stringify(additionalInformation);

    await this.mailRepo.save(mail);
  }
}
