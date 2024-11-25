import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { QuestionStatus } from '../enums/question-status.enum';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Título da dúvida' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição da dúvida' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID do questionador' })
  @IsInt()
  questionerId: number;

  @ApiProperty({ description: 'ID do moderador' })
  @IsInt()
  moderatorId: number;

  @ApiProperty({ description: 'Status da dúvida' })
  @IsEnum(QuestionStatus)
  status: QuestionStatus;
}
