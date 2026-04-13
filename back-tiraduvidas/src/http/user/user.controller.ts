import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CpfValidationPipe } from 'src/utils/pipes';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.insertOne(createUserDto);
    return {
      message: 'Usuário criado com sucesso.',
      user,
    };
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * Busca um usuário pelo CPF.
   *
   * O CPF pode ser informado com ou sem formatação:
   * - Com formatação: 123.456.789-09
   * - Sem formatação: 12345678909
   *
   * O pipe de validação normaliza e valida o CPF automaticamente,
   * incluindo verificação dos dígitos verificadores.
   *
   * @throws {HttpException} 400 - CPF inválido ou mal formatado
   * @throws {HttpException} 404 - Usuário não encontrado
   */
  @Get('cpf/:cpf')
  @ApiOperation({
    summary: 'Buscar usuário por CPF',
    description:
      'Retorna um usuário único pelo CPF. Aceita CPF com ou sem pontuação.',
  })
  @ApiParam({
    name: 'cpf',
    description: 'CPF do usuário (com ou sem formatação)',
    example: '123.456.789-09',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'CPF inválido ou mal formatado',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async findByCpf(@Param('cpf', CpfValidationPipe) cpf: string) {
    
    const user = await this.userService.findOne({ cpf });

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Usuário não encontrado',
          error: 'Not Found',
          field: 'cpf',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update({
      ...updateUserDto,
      id: parseInt(id, 10),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.delete(+id);
  }
}
