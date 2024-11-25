import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { FeedbackStatus } from '../enums/feedback-status.enum';

export class SearchFeedbackDto {
  @ApiPropertyOptional({ description: 'ID do feedback' })
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({ description: 'ID do usuário que realizou o feedback' })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiPropertyOptional({ description: 'ID da resposta' })
  @IsOptional()
  @IsInt()
  answerId?: number;

  @ApiPropertyOptional({ description: 'Justificativa do feedback' })
  @IsOptional()
  @IsString()
  justification?: string;

  @ApiPropertyOptional({ description: 'Situação da pergunta' })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  situation?: FeedbackStatus;
}
