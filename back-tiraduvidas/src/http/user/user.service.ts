import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserTypeormRepository } from './repositories/user-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service'; // Verifique se o caminho está correto

@Injectable()
export class UserService extends GenericService<User, UserTypeormRepository> {
  
  constructor(private readonly userRepository: UserTypeormRepository) {
    super(userRepository);
  }

  async findAll() {
    return await this.userRepository.findAllWithLastResponse();
  }
}