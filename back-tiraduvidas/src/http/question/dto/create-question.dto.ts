import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsString } from 'class-validator';
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

  @ApiProperty({ description: 'Categorias da dúvida' })
  @IsArray()
  categories: string[];

  @ApiProperty({ description: 'Status da dúvida' })
  @IsEnum(QuestionStatus)
  status: QuestionStatus;
}
