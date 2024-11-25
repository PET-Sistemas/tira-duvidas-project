import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { QuestionStatus } from '../enums/question-status.enum';

export class SearchQuestionDto {
  @ApiPropertyOptional({ description: 'ID da dúvida' })
  @IsInt()
  id?: number;

  @ApiPropertyOptional({ description: 'Título da dúvida' })
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição da dúvida' })
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'ID do questionador' })
  @IsInt()
  questionerId?: number;

  @ApiPropertyOptional({ description: 'ID do moderador' })
  @IsInt()
  moderatorId?: number;

  @ApiPropertyOptional({ description: 'Status da dúvida' })
  @IsEnum(QuestionStatus)
  status?: QuestionStatus;
}
