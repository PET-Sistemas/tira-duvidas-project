import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import validationOptions from './utils/validation-options';
import e, { json } from 'express';
import { AuthService } from './auth/auth.service';
import { RoleEnum } from './http/role/role.enum';
import { UserStatus } from './http/user/enums/user-status.enum';
import { UserService } from 'src/http/user/user.service';
import { emit } from 'process';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    origin: '*', // URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  // Se você estiver usando prefix na sua API
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(json({ limit: '200mb' }));
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));

  async function createAdminAndRespondent() {
    const authService = app.get(AuthService);
    const userService = app.get(UserService);

    if(await userService.findOne({email: "admin@ufms.br"})){
      return;
    }else{
      await authService.register({
        email: "admin@ufms.br",
        password: "123",
        provider: "email",
        name: "admin",
        phone: "123456789",
        role: RoleEnum.ADMIN,
        status: UserStatus.ACTIVE,
      });
    }
    if(await userService.findOne({email: "respondent@ufms.br"})){
      return;
    }else{
      await authService.register({
        email: "respondent@ufms.br",
        password: "123",
        provider: "email",
        name: "respondent",
        phone: "123456789",
        role: RoleEnum.RESPONDENT,
        status: UserStatus.ACTIVE,
      });
    }
  
  }

  createAdminAndRespondent();

}
void bootstrap();
