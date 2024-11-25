import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserTypeormRepository } from './repositories/user-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserTypeormRepository,
    {
      provide: UserService,
      useFactory: (userRepository: UserTypeormRepository) =>
        new UserService(userRepository),
      inject: [UserTypeormRepository],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
