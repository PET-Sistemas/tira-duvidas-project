import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthForgotPasswordDto } from './dto/auth-forgot-password.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { AuthResetPasswordDto } from './dto/auth-reset-password.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserDto } from 'src/http/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/http/user/dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset-password.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: AuthEmailLoginDto) {
    return await this.service.validateLogin(loginDto);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.service.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body() confirmEmailDto: AuthConfirmEmailDto) {
    return await this.service.confirmEmail(confirmEmailDto.hash);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK) // Usamos 200 OK porque não estamos "criando" um recurso visual
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    // Repassa o e-mail recebido para o nosso Service
    return this.service.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Passamos o token e a nova senha validados para o Service
    await this.service.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );

    return {
      message: 'Senha atualizada com sucesso. Você já pode fazer login.',
    };
  }

  @Get('my_profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async me(@Request() request) {
    return this.service.myProfile(request.user);
  }

  @Get('my_profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findMyPermissions(@Request() request) {
    return await this.service.myProfile(request.user);
  }

  @Patch('my_profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async update(
    @Request() request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = request.user.id;
    Object.assign(id, updateUserDto);
    return this.service.update(updateUserDto);
  }

  @Delete('my_profile')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async delete(@Request() request) {
    return this.service.delete(request.user);
  }
}
