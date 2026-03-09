import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateReportDto {
  @ApiProperty({ description: 'Nome do respondente' })
  @IsString()
  respondentName: string;

  @ApiProperty({ description: 'Período indicado no relatório (semestre)' })
  @IsString()
  semester: string;

  @ApiProperty({ description: 'CPF do respondente' })
  @IsString()
  respondentCpf: string;

  @ApiProperty({ description: 'E-mail do respondente' })
  @IsString()
  respondentEmail: string;

  @ApiProperty({ description: 'Telefone do respondente' })
  @IsString()
  respondentPhone: string;

  @ApiProperty({ description: 'Número total de dúvidas respondidas' })
  @IsInt()
  @Min(0)
  totalAnsweredQuestions: number;

  @ApiProperty({ description: 'Carga horária do respondente' })
  @IsInt()
  @Min(0)
  workloadHours: number;
}
