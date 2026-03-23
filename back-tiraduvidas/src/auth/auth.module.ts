import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/http/user/user.module';
import { MailModule } from 'src/http/mail/mail.module';
import { RedisService } from '../config/redis.service';
import { MailService } from '../http/mail/mail.service';

import { User } from '../http/user/entities/user.entity';
import { PasswordResetToken } from '../http/mail/entities/password-reset-token.entity'; // Ajuste o caminho da nova entidade

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule, // precisa para AuthGuard funcionar
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: 'secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    TypeOrmModule.forFeature([User, PasswordResetToken]),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController], // <-- registra o controller
  providers: [AuthService, JwtStrategy, RedisService], // <-- registra service e strategy
  exports: [AuthService], // exporta se outros módulos precisarem
})
export class AuthModule {}
