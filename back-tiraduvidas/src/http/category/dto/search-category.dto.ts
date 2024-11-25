import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchCategoryDto {
  @ApiPropertyOptional({ description: 'ID da categoria' })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiPropertyOptional({ description: 'Nome da categoria' })
  @IsOptional()
  @IsString()
  name?: string;
}
