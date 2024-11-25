import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../entities/user-role.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class UserRoleTypeormRepository extends GenericRepository<UserRole> {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {
    super(userRoleRepository);
  }
}
