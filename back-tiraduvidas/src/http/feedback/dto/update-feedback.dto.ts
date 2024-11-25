import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackDto } from './create-feedback.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { FeedbackStatus } from '../enums/feedback-status.enum';

export class UpdateFeedbackDto {
  @ApiProperty({ description: 'ID do feedback' })
  id: number;

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
