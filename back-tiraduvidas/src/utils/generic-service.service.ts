import { Injectable } from '@nestjs/common';
import { PaginationResult } from './typeorm/pagination-options';
import { IGenericRepository } from './typeorm/generic-repository.interface';
import { GenericEntity } from './typeorm/generic-entity.entity';

@Injectable()
export abstract class GenericService<
  Entity extends GenericEntity,
  Repository extends IGenericRepository<Entity>,
> {
  constructor(private repo: Repository) {}

  async insertOne<DTO>(dto: DTO): Promise<Entity> {
    return await this.repo.insertOne(dto);
  }

  async insertMany<DTO>(dto: DTO[]): Promise<Entity[]> {
    return await this.repo.insertMany(dto);
  }

  async findOne<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity | undefined> {
    return await this.repo.findOne(dto, relations, sort);
  }

  async findAll(): Promise<Entity[]> {
    return await this.findMany({});
  }

  async findMany<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity[]> {
    return await this.repo.findMany(dto, relations, sort);
  }

  async findManyWithPagination<DTO>(
    dto: DTO,
    page = 1,
    limit = 10,
  ): Promise<PaginationResult<Entity>> {
    return await this.repo.findManyWithPagination(dto, page, limit);
  }

  async exist<DTO>(dto: DTO): Promise<boolean> {
    return await this.repo.exist(dto);
  }

  async getOneFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity | undefined> {
    return await this.repo.getOneFromARelatedEntity(item, relation);
  }

  async getManyFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity[] | undefined> {
    return await this.repo.getManyFromARelatedEntity(item, relation);
  }

  async update<DTO>(dto: DTO): Promise<Entity | undefined> {
    const filter = { id: dto['id'] };
    return await this.repo.update(filter, dto);
  }

  async upsert<DTO>(dto: DTO): Promise<Entity | Entity[]> {
    return await this.repo.upsert(dto);
  }

  async delete<DTO>(dto: DTO): Promise<void> {
    await this.repo.delete(dto);
  }
}
