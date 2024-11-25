import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria' })
  @IsString()
  name: string;
}
