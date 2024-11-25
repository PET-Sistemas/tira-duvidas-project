import { Injectable } from '@nestjs/common';
import { UserRole } from './entities/user-role.entity';
import { UserRoleTypeormRepository } from './repositories/user-role-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class UserRoleService extends GenericService<
  UserRole,
  UserRoleTypeormRepository
> {}
