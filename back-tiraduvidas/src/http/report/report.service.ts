import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/utils/generic-service.service';
import { Answer } from '../answer/entities/answer.entity';
import { RoleEnum } from '../role/role.enum';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import PDFDocument from 'pdfkit';
import { ExportReportDto, ReportFormat } from './dto/export-report.dto';
import { Report } from './entities/report.entity';
import { ReportTypeormRepository } from './repositories/report-typeorm-repository';

@Injectable()
export class ReportService extends GenericService<
  Report,
  ReportTypeormRepository
> {
  constructor(
    reportRepository: ReportTypeormRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(reportRepository);
  }

  async exportReport(dto: ExportReportDto): Promise<{
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  }> {
    const { startDate, endDate, format } = dto;
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new BadRequestException('Datas inválidas para geração do relatório.');
    }

    if (start > end) {
      throw new BadRequestException(
        'A data inicial deve ser menor ou igual à data final.',
      );
    }

    const respondents = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin(
        Answer,
        'answer',
        'answer.respondent_id = user.id AND answer.deleted_at IS NULL AND answer.created_at BETWEEN :start AND :end',
        { start, end },
      )
      .select([
        'user.id AS id',
        'user.name AS name',
        'user.cpf AS cpf',
        'user.email AS email',
        'user.phone AS phone',
      ])
      .addSelect('COUNT(answer.id)', 'totalAnswers')
      .where('user.role = :role', { role: RoleEnum.RESPONDENT })
      .andWhere('user.deleted_at IS NULL')
      .groupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.cpf')
      .addGroupBy('user.email')
      .addGroupBy('user.phone')
      .orderBy('user.name', 'ASC')
      .getRawMany();

    const formattedStart = this.formatDate(startDate);
    const formattedEnd = this.formatDate(endDate);

    const reportRows = respondents.map((item) => ({
      nome: item.name || '',
      cpf: item.cpf || '',
      email: item.email || '',
      telefone: item.phone || '',
      totalRespostas: Number(item.totalanswers ?? item.totalAnswers ?? 0),
      dataInicio: formattedStart,
      dataFim: formattedEnd,
    }));

    const safeStart = startDate.replace(/-/g, '');
    const safeEnd = endDate.replace(/-/g, '');

    if (format === ReportFormat.PDF) {
      const pdfBuffer = await this.generatePdfBuffer(
        reportRows,
        formattedStart,
        formattedEnd,
      );

      return {
        buffer: pdfBuffer,
        fileName: `relatorio-respondentes-${safeStart}-${safeEnd}.pdf`,
        mimeType: 'application/pdf',
      };
    }

    const csvContent = this.generateCsv(reportRows);
    return {
      buffer: Buffer.from(csvContent, 'utf-8'),
      fileName: `relatorio-respondentes-${safeStart}-${safeEnd}.csv`,
      mimeType: 'text/csv; charset=utf-8',
    };
  }

  private generateCsv(
    rows: {
      nome: string;
      cpf: string;
      email: string;
      telefone: string;
      totalRespostas: number;
      dataInicio: string;
      dataFim: string;
    }[],
  ): string {
    const header = [
      'CPF',
      'Nome',
      'E-mail',
      'Telefone',
      'Total de Perguntas Respondidas',
      'Data Início',
      'Data Fim',
    ];

    const csvRows = rows.map((row) =>
      [
        row.cpf,
        row.nome,
        row.email,
        row.telefone,
        String(row.totalRespostas),
        row.dataInicio,
        row.dataFim,
      ]
        .map((value) => this.escapeCsv(value))
        .join(','),
    );

    return [header.join(','), ...csvRows].join('\n');
  }

  private escapeCsv(value: string): string {
    const normalized = value ?? '';
    return `"${String(normalized).replace(/"/g, '""')}"`;
  }

  private formatDate(isoDate: string): string {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  }

  private async generatePdfBuffer(
    rows: {
      nome: string;
      cpf: string;
      email: string;
      telefone: string;
      totalRespostas: number;
      dataInicio: string;
      dataFim: string;
    }[],
    startDate: string,
    endDate: string,
  ): Promise<Buffer> {
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));

    doc.fontSize(16).text('Relatório de Respondentes', { align: 'center' });
    doc
      .moveDown(0.5)
      .fontSize(11)
      .text(`Período: ${startDate} até ${endDate}`, { align: 'center' });
    doc.moveDown();

    if (!rows.length) {
      doc.fontSize(11).text('Nenhum respondente encontrado para o período.');
    } else {
      rows.forEach((row, index) => {
        doc
          .fontSize(11)
          .text(`${index + 1}. Nome: ${row.nome || '-'}`)
          .text(`CPF: ${row.cpf || '-'}`)
          .text(`E-mail: ${row.email || '-'}`)
          .text(`Telefone: ${row.telefone || '-'}`)
          .text(`Total de perguntas respondidas: ${row.totalRespostas}`)
          .text(`Data Início: ${row.dataInicio}`)
          .text(`Data Fim: ${row.dataFim}`)
          .moveDown();
      });
    }

    doc.end();

    return await new Promise((resolve, reject) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (error) => reject(error));
    });
  }
}
