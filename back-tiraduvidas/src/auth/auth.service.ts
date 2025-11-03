import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    private redisService: RedisService,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto) {
    const user = await this.userService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        'Email not found',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new HttpException('Inactivated user', 423);
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isValidPassword) {
      const token = this.jwtService.sign(
        {
          id: user.id,
          role: user.role,
        },
      );

      return { token, message:"Login realizado com sucesso.", user: user };
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: ['Incorrect username or password'],
        error: 'Unprocessable Entity',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async register(registerDto: CreateUserDto) {
    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    registerDto.hash = hash;
    registerDto.status = UserStatus.ACTIVE;

    const user = await this.userService.insertOne(registerDto);

    await this.mailService.userSignUp({
      to: user.email,
      data: {
        hash,
      },
    });

    return {
      message: 'Usuário criado com sucesso.',
      user,
    };
  }

  async confirmEmail(hash: string): Promise<User> {
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          errors: {
            email: 'emailNotExists',
          },
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // Gera um token seguro aleatório e armazena no Redis com TTL
    const token = crypto.randomBytes(32).toString('hex');
    const ttlSec = Number(process.env.RESET_TOKEN_TTL_SECONDS || 900); // 15min
    const redisResponse = await this.redisService.set(`pwdreset:${token}`, String(user.id), ttlSec);

    if(!redisResponse){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            redis: 'Redis error',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const mailResponse = await this.mailService.forgotPassword({
      to: email,
      data: {
        token,
        resetLink: `http://localhost:3000/reset-password?token=${token}`
      },
    });

    return {
      HttpStatus: HttpStatus.OK,
      message: 'Email enviado com sucesso.',
      //user,
    };
  }

  async resetPassword(hash: string, password: string): Promise<User> {
    // Try new flow: token stored in Redis
    const redisKey = `pwdreset:${hash}`; // 'hash' may be token here
    const userIdFromRedis = await this.redisService.get(redisKey);

    if (userIdFromRedis) {
      const userById = await this.userService.findOne({
        id: Number(userIdFromRedis),
      });

      if (!userById) {
        await this.redisService.del(redisKey);
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              token: 'invalid',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      userById.password = password;
      const updated = await this.userService.update(userById);
      await this.redisService.del(redisKey); // invalidate token
      return updated;
    }

    // Fallback to legacy flow: DB "hash"
    const user = await this.userService.findOne({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            hash: `notFound`,
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    user.password = password;
    const result = this.userService.update(user);
    return await result;
  }

  async myProfile(user: User): Promise<User> {
    const foundedUser = await this.userService.findOne({
      id: user.id,
    });

    if (!foundedUser) return;

    return foundedUser;
  }

  async update(userDto: UpdateUserDto): Promise<User> {
    const foundedUser = await this.userService.findOne({
      id: userDto.id,
    });

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
