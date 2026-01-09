import { Injectable } from '@nestjs/common';
import { MailDataDto } from './dto/mail-data.dto';
//import { MailRepositoryTypeorm } from './repositories/mail.repository.typeorm';
import { Mail } from './entities/mail-typeorm.entity';
import { SaveEmailDto } from './dto/save-email.dto';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: any = new Resend(process.env.RESEND_API_KEY);
  private readonly from: string = process.env.MAIL_FROM || 'petsistemas.adm@gmail.com';

  // constructor(private readonly mailRepo: MailRepositoryTypeorm) {
  //   this.resend =;
  //   this.from = 
  // }

  async userSignUp(mailData: MailDataDto<{ hash: string }>) {
    const subject = 'Confirmação de cadastro';

    const confirmBase =
      process.env.WEB_URL || process.env.APP_URL || 'http://localhost:3000';
    const confirmLink = `${confirmBase}/confirm-email?hash=${mailData.data.hash}`;

    await this.resend.emails.send({
      from: this.from,
      to: mailData.to,
      subject,
      html: `
        <p>Bem-vindo!</p>
        <p>Confirme seu email clicando no link abaixo:</p>
        <p><a href="${confirmLink}">${confirmLink}</a></p>
      `,
    });

    // Optional DB logging example (adapt fields if needed)
    // await this.createEmail({
    //   to: mailData.to,
    //   subject,
    //   template: 'user_signup',
    //   context: { confirmLink },
    //   additionalInformation: JSON.stringify({ was_used: false, usage_attempts: 0 }),
    // });
  }

  async forgotPassword(mailData: MailDataDto<{ token: string; resetLink: string }>,) {
    const subject = 'Redefinição de senha';

    await this.resend.emails.send({
      from: this.from,
      to: mailData.to,
      subject,
      html: `
        <h1>Tira Dúvidas - Redefinição de Senha</h1>
        <p>Você solicitou a redefinição de senha.</p>
        <p>Use o link abaixo dentro do prazo de validade:</p>'W
        <p><a href="${mailData.data.resetLink}">${mailData.data.resetLink}</a></p>
        <p>Se você não solicitou, ignore este email.</p>
      `,
    });

    console.log("email de redefinição de senha enviado para:", mailData.to, "de: ", this.from);
    // Optional DB logging example (adapt fields if needed)
    // await this.createEmail({
    //   to: mailData.to,
    //   subject,
    //   template: 'forgot_password',
    //   context: { resetLink: mailData.data.resetLink },
    //   additionalInformation: JSON.stringify({
    //     token: mailData.data.token,
    //     was_used: false,
    //     usage_attempts: 0,
    //   }),
    // });
  }

  // async lastByEmailAndTemplate(email: string, templateName: string) {
  //   return await this.mailRepo.findLastMailByEmailAndTemplate(
  //     email,
  //     templateName,
  //   );
  // }

  // async findEmailById(mailId: number): Promise<Mail> {
  //   return this.mailRepo.findOneById(mailId);
  // }

  // async createEmail(data: SaveEmailDto) {
  //   await this.mailRepo.save(data);
  // }

  // async setEmailTransactionCodeAsUsed(mailId: number) {
  //   const mail = await this.mailRepo.findOneById(mailId);

  //   const additionalInformation = JSON.parse(mail.additionalInformation);
  //   additionalInformation.was_used = true;

  //   mail.additionalInformation = JSON.stringify(additionalInformation);

  //   await this.mailRepo.save(mail);
  // }

  // async updateEmailAttemptToUseTheCode(mailId: number) {
  //   const mail = await this.mailRepo.findOneById(mailId);

  //   const additionalInformation = JSON.parse(mail.additionalInformation);
  //   additionalInformation.usage_attempts += 1;

  //   mail.additionalInformation = JSON.stringify(additionalInformation);

  //   await this.mailRepo.save(mail);
  // }
}
