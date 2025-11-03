import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/http/user/user.module';
//import { MailModule } from 'src/http/mail/mail.module';
import { RedisService } from '../config/redis.service';
import { MailService } from '../http/mail/mail.service';

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
    UserModule,
  ],
  controllers: [AuthController],   // <-- registra o controller
  providers: [AuthService, JwtStrategy, RedisService, MailService], // <-- registra service e strategy
  exports: [AuthService], // exporta se outros módulos precisarem
})
export class AuthModule {}
