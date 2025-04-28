import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEnum } from 'class-validator';
import { AnswerStatus } from '../enums/answer-status.enum';

export class CreateAnswerDto {
  @ApiProperty({ description: 'ID da dúvida a que se refere a resposta' })
  @IsInt()
  questionId: number;

  @ApiProperty({ description: 'ID do respondente' })
  @IsInt()
  respondentId: number;

  @ApiProperty({ description: 'ID do auditor' })
  @IsInt()
  auditorId: number;

  @ApiProperty({ description: 'Descrição da resposta' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status da dúvida' })
  @IsEnum(AnswerStatus)
  status: AnswerStatus;
}
