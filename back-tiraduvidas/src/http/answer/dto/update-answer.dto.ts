import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAnswerDto {
  @ApiProperty({ description: 'ID da resposta' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({
    description: 'ID da dúvida a que se refere a resposta',
  })
  @IsOptional()
  @IsInt()
  questionId?: number;

  @ApiPropertyOptional({ description: 'ID do respondente' })
  @IsOptional()
  @IsInt()
  respondentId?: number;

  @ApiPropertyOptional({ description: 'ID do auditor' })
  @IsOptional()
  @IsInt()
  auditorId?: number;

  @ApiPropertyOptional({ description: 'Descrição da resposta' })
  @IsOptional()
  @IsString()
  description?: string;
}
