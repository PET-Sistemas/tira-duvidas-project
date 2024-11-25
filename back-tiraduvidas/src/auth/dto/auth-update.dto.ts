import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class AuthUpdateDto {
  @ApiProperty({ description: 'first name', example: 'Capivara' })
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ description: 'last name', example: 'Oliveira' })
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  oldPassword: string;
}
