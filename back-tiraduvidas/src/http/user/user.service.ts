import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserTypeormRepository } from './repositories/user-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service'; // Verifique se o caminho está correto
import { RoleEnum } from '../role/role.enum';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UserService extends GenericService<User, UserTypeormRepository> {
  constructor(private readonly userRepository: UserTypeormRepository) {
    super(userRepository);
  }

  async findAll() {
    return await this.userRepository.findAllWithLastResponse();
  }

  async update<DTO>(dto: DTO): Promise<User | undefined> {
    const id = dto['id'];
    const status = dto['status'];

    if (status === UserStatus.INACTIVE) {
      const targetUser = await this.findOne({ id });

      if (targetUser?.role === RoleEnum.ADMIN) {
        throw new BadRequestException(
          'Não é possível inativar um usuário com perfil ADMIN.',
        );
      }
    }
    return await super.update(dto);
  }
}
