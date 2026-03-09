import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchReportDto {
  @ApiPropertyOptional({ description: 'ID do relatório' })
  @IsOptional()
  @IsInt()
  id?: number;

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
}
