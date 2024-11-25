import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserTypeormRepository } from './repositories/user-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class UserService extends GenericService<User, UserTypeormRepository> {}
