import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { RoleEnum } from '../../role/role.enum';

export class UpdateUserRoleDto {
  @ApiProperty({ description: 'ID do papel usuário' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'ID do usuário' })
  @IsInt()
  userId?: number;

  @ApiProperty({ description: 'Papel' })
  @IsEnum(RoleEnum)
  role?: RoleEnum;
}
