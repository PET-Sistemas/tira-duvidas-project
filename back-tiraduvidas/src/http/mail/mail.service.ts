import { Injectable } from '@nestjs/common';
import { MailDataDto } from './dto/mail-data.dto';
//import { MailRepositoryTypeorm } from './repositories/mail.repository.typeorm';
import { Mail } from './entities/mail-typeorm.entity';
import { SaveEmailDto } from './dto/save-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Configura a conexão com o servidor SMTP do Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Pegamos as variáveis de forma segura através do ConfigService
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async userSignUp(mailData: MailDataDto<{ hash: string }>) {
    const subject = 'Confirmação de cadastro';
    const confirmBase =
      process.env.WEB_URL || process.env.APP_URL || 'http://localhost:3000';
    const confirmLink = `${confirmBase}/confirm-email?hash=${mailData.data.hash}`;

    try {
      await this.transporter.sendMail({
        from: `"Tira Dúvidas" <${process.env.EMAIL_USER}>`,
        to: mailData.to,
        subject,
        html: `
          <p>Bem-vindo!</p>
          <p>Confirme seu email clicando no link abaixo:</p>
          <p><a href="${confirmLink}">${confirmLink}</a></p>
        `,
      });
      console.log(`Email de cadastro enviado para: ${mailData.to}`);
    } catch (error) {
      console.error('Erro ao enviar email de cadastro:', error);
    }
  }

  async forgotPassword(
    mailData: MailDataDto<{ token: string; resetLink: string }>,
  ) {
    const subject = 'Redefinição de senha';

    try {
      await this.transporter.sendMail({
        from: `"Suporte Tira Dúvidas" <${process.env.EMAIL_USER}>`,
        to: mailData.to,
        subject,
        html: `
          <h1>Tira Dúvidas - Redefinição de Senha</h1>
          <p>Você solicitou a redefinição de senha.</p>
          <p>Use o link abaixo dentro do prazo de validade:</p>
          <p><a href="${mailData.data.resetLink}">${mailData.data.resetLink}</a></p>
          <p>Se você não solicitou, ignore este email.</p>
        `,
      });
      console.log(`Email de redefinição enviado para: ${mailData.to}`);
    } catch (error) {
      console.error('Erro ao enviar email de redefinição:', error);
    }
  }
}
