import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserRoleTypeormRepository } from './repositories/user-role-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [
    UserRoleService,
    UserRoleTypeormRepository,
    {
      provide: UserRoleService,
      useFactory: (userRepository: UserRoleTypeormRepository) =>
        new UserRoleService(userRepository),
      inject: [UserRoleTypeormRepository],
    },
  ],
  exports: [UserRoleService],
})
export class UserRoleModule {}
