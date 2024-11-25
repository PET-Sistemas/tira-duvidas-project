import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { FeedbackStatus } from '../enums/feedback-status.enum';

export class CreateFeedbackDto {
  @ApiProperty({ description: 'ID do usuário que realizou o feedback' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'ID da resposta' })
  @IsInt()
  answerId: number;

  @ApiProperty({ description: 'Justificativa do feedback' })
  @IsString()
  justification: string;

  @ApiProperty({ description: 'Situação da pergunta' })
  @IsEnum(FeedbackStatus)
  situation: FeedbackStatus;
}
