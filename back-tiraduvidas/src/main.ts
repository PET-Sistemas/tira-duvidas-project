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
import { CategoryService } from './http/category/category.service';
import { emit } from 'process';
import { ClassSerializerInterceptor } from '@nestjs/common'; // Importe isso
import { Reflector } from '@nestjs/core'; // Importe isso

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const allowedOrigins = [
    'https://tiraduvidashomolog.facom.ufms.br',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Permite chamadas sem Origin (curl/postman) também
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(json({ limit: '200mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos extras que não estão no DTO (protege contra injeção de dados)
      forbidNonWhitelisted: true, // Retorna erro se o usuário enviar campos não esperados
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  app
    .getHttpAdapter()
    .get('/api/openapi.json', (req, res) => res.json(document));

  await app.listen(process.env.APP_PORT ?? 8080);

  async function inicialData() {
    const authService = app.get(AuthService);
    const userService = app.get(UserService);
    const categoryService = app.get(CategoryService);

    // Cria categorias iniciais
    const categorias = [
      'Matemática',
      'Física',
      'Química',
      'Biologia',
      'História',
      'Geografia',
      'Literatura',
      'Artes',
      'Educação Física',
      'Inglês',
    ];
    for (const nome of categorias) {
      const categoriaExistente = await categoryService.findOne({ name: nome });
      if (!categoriaExistente) {
        await categoryService.insertOne({ name: nome });
      }
    }

    // Cria usuários iniciais

    if (await userService.findOne({ email: 'admin@ufms.br' })) {
      return;
    } else {
      await authService.register({
        email: 'admin@ufms.br',
        password: '123',
        provider: 'email',
        name: 'admin',
        phone: '123456789',
        role: RoleEnum.ADMIN,
        status: UserStatus.ACTIVE,
      });
    }

    if (await userService.findOne({ email: 'respondent@ufms.br' })) {
      return;
    } else {
      await authService.register({
        email: 'respondent@ufms.br',
        password: '123',
        provider: 'email',
        name: 'respondent',
        phone: '123456789',
        role: RoleEnum.RESPONDENT,
        status: UserStatus.ACTIVE,
      });
    }

    if (await userService.findOne({ email: 'respondent2@ufms.br' })) {
      return;
    } else {
      await authService.register({
        email: 'respondent2@ufms.br',
        password: '123',
        provider: 'email',
        name: 'respondent2',
        phone: '123456789',
        role: RoleEnum.RESPONDENT,
        status: UserStatus.ACTIVE,
      });
    }
  }

  inicialData();
}
void bootstrap();
