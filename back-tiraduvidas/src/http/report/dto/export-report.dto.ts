import { IsDateString, IsEnum } from 'class-validator';

export enum ReportFormat {
  CSV = 'csv',
  PDF = 'pdf',
}

export class ExportReportDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(ReportFormat)
  format: ReportFormat;
}
