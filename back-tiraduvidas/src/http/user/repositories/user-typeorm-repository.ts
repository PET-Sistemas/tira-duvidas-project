import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository'; 
import { Repository } from 'typeorm';

@Injectable()
export class UserTypeormRepository extends GenericRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findAllWithLastResponse() {
    return this.userRepository.createQueryBuilder('user')
      .leftJoin('Answer', 'answers', 'answers.respondent_id = user.id')      
      .select([
        'user.id AS id',
        'user.name AS name',       
        'user.email AS email',
        'user.role AS role',
        'user.status AS status',
        'user.createdAt AS "createdAt"', 
      ])
      
      .addSelect('MAX(answers.created_at)', 'lastResponse')
      
      .groupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.email')
      .addGroupBy('user.role')
      .addGroupBy('user.status')
      .addGroupBy('user.createdAt')
      
      .orderBy('user.name', 'ASC')
      
      .getRawMany();
  }
}