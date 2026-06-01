import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/http/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { UserStatus } from 'src/http/user/enums/user-status.enum';
import * as crypto from 'crypto';
import { UserService } from 'src/http/user/user.service';
import { MailService } from 'src/http/mail/mail.service';
import { CreateUserDto } from 'src/http/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/http/user/dto/update-user.dto';
import { RedisService } from 'src/config/redis.service';
import { InjectRepository } from '@nestjs/typeorm'; // <-- NOVO
import { Repository } from 'typeorm'; // <-- NOVO
import { PasswordResetToken } from '../http/mail/entities/password-reset-token.entity'; // <-- NOVO

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    private redisService: RedisService,
    @InjectRepository(PasswordResetToken)
    private tokenRepository: Repository<PasswordResetToken>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto) {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new HttpException('Usuário inativo', 423);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = this.jwtService.sign({
        id: user.id,
        role: user.role,
      });

      return { token, message: 'Login realizado com sucesso.', user: user };
    }

    throw new UnauthorizedException('Email ou senha incorretos');
  }

  async register(registerDto: CreateUserDto) {
    const existing = await this.userService.findOne({
      email: registerDto.email,
    });
    if (existing) {
      throw new UnprocessableEntityException('emailAlreadyExists');
    }

    const existingCpf = await this.userService.findOne({
      cpf: registerDto.cpf,
    });
    if (existingCpf) {
      throw new UnprocessableEntityException('cpfAlreadyExists');
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    registerDto.hash = hash;
    registerDto.status = UserStatus.ACTIVE;

    const user = await this.userService.insertOne(registerDto);

    try {
      await this.mailService.userSignUp({
        to: user.email,
        data: {
          hash,
        },
      });
    } catch (error) {
      await this.userService.delete(user.id);

      throw new InternalServerErrorException(
        'Erro ao enviar o e-mail de confirmação. O cadastro foi cancelado, tente novamente.',
      );
    }

    return {
      user,
    };
  }

  async confirmEmail(hash: string): Promise<User> {
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) {
      throw new NotFoundException(`notFound`);
    }

    user.hash = null;
    user.status = UserStatus.ACTIVE;
    const result = await this.userService.update(user);
    return result;
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOne({
      email,
    });

    if (!user) {
      return {
        HttpStatus: HttpStatus.OK,
        message: 'Se o e-mail estiver cadastrado, enviaremos as instruções.',
      };
    }

    // Gera um token seguro aleatório e armazena no Redis com TTL
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const resetToken = this.tokenRepository.create({
      token,
      user,
      expiresAt,
    });
    await this.tokenRepository.save(resetToken);

    await this.mailService.forgotPassword({
      to: email,
      data: {
        token,
        resetLink: `http://localhost:3000/redefinir-senha?token=${token}`,
      },
    });

    return {
      HttpStatus: HttpStatus.OK,
      message: 'Se o e-mail estiver cadastrado, enviaremos as instruções.',
    };
  }

  async resetPassword(tokenString: string, newPassword: string): Promise<User> {
    // 1. Busca o token no banco e traz os dados do usuário junto
    const resetToken = await this.tokenRepository.findOne({
      where: { token: tokenString },
      relations: ['user'],
    });

    // 2. Verifica se o token existe e se não expirou
    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { token: 'Token inválido ou expirado' },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = resetToken.user;

    // 3. CRÍTICO: Fazer o Hash da nova senha antes de salvar!
    // O bcrypt pega a senha pura (ex: "123456") e transforma em algo seguro
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Atualiza a senha do usuário
    const updatedUser = await this.userService.update({
      id: user.id,
      password: hashedPassword,
    } as any);

    // 5. Invalida o token deletando-o do banco
    await this.tokenRepository.delete(resetToken.id);

    return updatedUser;
  }

  async myProfile(user: User): Promise<User> {
    const foundedUser = await this.userService.findOne({
      id: user.id,
    });

    if (!foundedUser) {
      throw new NotFoundException('Perfil não encontrado');
    }
    return foundedUser;
  }

  async update(userDto: UpdateUserDto): Promise<User> {
    const foundedUser = await this.userService.findOne({
      id: userDto.id,
    });
    if (!foundedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const isValidOldPassword = await bcrypt.compare(
      userDto.oldPassword,
      foundedUser.password,
    );

    if (!isValidOldPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            oldPassword: 'incorrect password',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.userService.update(userDto);
  }

  async delete(user: User): Promise<void> {
    await this.userService.delete(user.id);
  }
}
