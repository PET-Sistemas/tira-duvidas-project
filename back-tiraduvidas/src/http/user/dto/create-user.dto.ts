import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStatus } from '../enums/user-status.enum';
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { RoleEnum } from 'src/http/role/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail()
  email: string | null;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'Senha deve conter pelo menos uma letra maiúscula' })
  @Matches(/[a-z]/, { message: 'Senha deve conter pelo menos uma letra minúscula' })
  @Matches(/\d/, { message: 'Senha deve conter pelo menos um número' })
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/, { message: 'Senha deve conter pelo menos um caractere especial (!@#$%^&*)' })
  password: string;

  @IsOptional()
  @IsString()
  hash?: string;

  @ApiProperty({ description: 'Provedor de autenticação', default: 'email' })
  @IsString()
  provider: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  name: string | null;

  @ApiProperty({ description: 'CPF do usuário' })
  @IsString()
  cpf: string | null;

  @ApiProperty({ description: 'Telefone do usuário' })
  @IsString()
  phone: string | null;

  @ApiProperty({
    description: 'Papel do usuário',
    default: RoleEnum.QUESTIONER,
  })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiPropertyOptional({
    description: 'Status do usuário',
    default: UserStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
