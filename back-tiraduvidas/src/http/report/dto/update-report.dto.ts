import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateReportDto {
  @ApiProperty({ description: 'ID do relatório' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ description: 'Nome do respondente' })
  @IsOptional()
  @IsString()
  respondentName?: string;

  @ApiPropertyOptional({
    description: 'Período indicado no relatório (semestre)',
  })
  @IsOptional()
  @IsString()
  semester?: string;

  @ApiPropertyOptional({ description: 'CPF do respondente' })
  @IsOptional()
  @IsString()
  respondentCpf?: string;

  @ApiPropertyOptional({ description: 'E-mail do respondente' })
  @IsOptional()
  @IsString()
  respondentEmail?: string;

  @ApiPropertyOptional({ description: 'Telefone do respondente' })
  @IsOptional()
  @IsString()
  respondentPhone?: string;

  @ApiPropertyOptional({ description: 'Número total de dúvidas respondidas' })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalAnsweredQuestions?: number;

  @ApiPropertyOptional({ description: 'Carga horária do respondente' })
  @IsOptional()
  @IsInt()
  @Min(0)
  workloadHours?: number;
}
