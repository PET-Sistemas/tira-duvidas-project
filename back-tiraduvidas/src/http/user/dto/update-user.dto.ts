import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/http/role/role.enum';
import { UserStatus } from '../enums/user-status.enum';

export class UpdateUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  @IsInt()
  id: number;

  @ApiPropertyOptional({ description: 'E-mail do usuário' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Senha do usuário' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ description: 'Senha antiga do usuário' })
  @IsOptional()
  @IsString()
  oldPassword?: string;

  @ApiPropertyOptional({ description: 'Provedor de autenticação' })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiPropertyOptional({ description: 'Primeiro nome do usuário' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Último nome do usuário' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Papel do usuário' })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiPropertyOptional({ description: 'Status do usuário' })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
