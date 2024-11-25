import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'ID da categoria' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ description: 'Nome da categoria' })
  @IsOptional()
  @IsString()
  name?: string;
}
