import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { QuestionStatus } from '../enums/question-status.enum';

export class UpdateQuestionDto {
  @ApiProperty({ description: 'ID da dúvida' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ description: 'Título da dúvida' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição da dúvida' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'ID do questionador' })
  @IsOptional()
  @IsInt()
  questionerId?: number;

  @ApiPropertyOptional({ description: 'Status da dúvida' })
  @IsOptional()
  @IsEnum(QuestionStatus)
  status?: QuestionStatus;

  @ApiPropertyOptional({ description: 'Categorias da dúvida' })
  @IsOptional()
  categories?: string[];
}
