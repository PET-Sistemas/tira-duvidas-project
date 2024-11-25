import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SaveEmailDto } from '../dto/save-email.dto';
import { Mail } from '../entities/mail-typeorm.entity';

export class MailRepositoryTypeorm {
  findLastMailByEmailAndTemplate(email: string, templateName: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepo: Repository<Mail>,
  ) {}

  async save(data: SaveEmailDto): Promise<void> {
    await this.mailRepo.save(data);
  }

  async findOneById(mailId: number): Promise<Mail> {
    const mailIdentity = { id: mailId } as FindOneOptions<Mail>;
    return await this.mailRepo.findOne(mailIdentity);
  }

  async updateAdditionalInformation(
    mailId: number,
    additionalInformation: string,
  ): Promise<void> {
    const mailIdentity = { id: mailId } as FindOneOptions<Mail>;
    const mail = await this.mailRepo.findOne(mailIdentity);

    mail.additionalInformation = additionalInformation;

    await this.mailRepo.save(mail);
  }
}
