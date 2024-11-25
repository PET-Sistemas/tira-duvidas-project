import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryTypeormRepository } from './repositories/category-typeorm-repository';
import { GenericService } from 'src/utils/generic-service.service';

@Injectable()
export class CategoryService extends GenericService<
  Category,
  CategoryTypeormRepository
> {}
