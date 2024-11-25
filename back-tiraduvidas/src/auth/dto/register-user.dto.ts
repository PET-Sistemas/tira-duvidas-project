import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterUserDto {
  @ApiProperty({ description: 'user email', example: 'your_email@fake.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty({ description: 'first name', example: 'Capivara' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'last name', example: 'Oliveira' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'role', example: 'respondent' })
  @IsNotEmpty()
  role: string;

  @IsOptional()
  status: string;

  @IsOptional()
  @IsString()
  hash?: string;
}
