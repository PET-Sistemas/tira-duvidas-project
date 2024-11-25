import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryTypeormRepository } from './repositories/category-typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryTypeormRepository,
    {
      provide: CategoryService,
      useFactory: (userRepository: CategoryTypeormRepository) =>
        new CategoryService(userRepository),
      inject: [CategoryTypeormRepository],
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
