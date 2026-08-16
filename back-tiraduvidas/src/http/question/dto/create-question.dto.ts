import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionStatus } from '../enums/question-status.enum';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Título da dúvida' })
  @IsString()
  @IsNotEmpty({ message: 'O título da dúvida não pode estar vazio' })
  title: string;

  @ApiProperty({ description: 'Descrição da dúvida' })
  @IsString()
  @IsNotEmpty({ message: 'A descrição da dúvida não pode estar vazia' })
  description: string;

  @ApiProperty({ description: 'ID do questionador' })
  @IsInt()
  questionerId: number;

  @ApiProperty({ description: 'Categorias da dúvida' })
  @IsArray()
  @ArrayNotEmpty({ message: 'As categorias da dúvida não podem estar vazias' })
  categories: string[];

  @ApiProperty({
    description: 'Categoria personalizada (não salva no banco)',
    required: false,
  })
  @IsString()
  @IsOptional()
  customCategory?: string;

  @ApiProperty({ description: 'Status da dúvida' })
  @IsEnum(QuestionStatus)
  status: QuestionStatus;
}
function ArrayNotEmpty(arg0: { message: string; }): (target: CreateQuestionDto, propertyKey: "categories") => void {
  throw new Error('Function not implemented.');
}

