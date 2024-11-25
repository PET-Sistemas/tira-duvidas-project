import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { GenericRepository } from 'src/utils/typeorm/generic-repository';
import { Repository } from 'typeorm';

export class CategoryTypeormRepository extends GenericRepository<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository);
  }
}
