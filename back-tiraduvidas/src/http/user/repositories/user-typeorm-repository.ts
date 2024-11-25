import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class UserTypeormRepository extends GenericRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
