import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'O token de recuperação é obrigatório.' })
  @IsString({ message: 'O token deve ser uma string válida.' })
  token: string;

  @IsNotEmpty({ message: 'A nova senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string válida.' })
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres.' })
  password: string;
}
