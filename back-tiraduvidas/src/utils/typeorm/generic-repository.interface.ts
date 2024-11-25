import { IGenericEntity } from './generic-entity.interface';
import { PaginationResult } from './pagination-options';
import { FindConditions } from 'typeorm';

export interface IGenericRepository<Entity extends IGenericEntity> {
  insertOne<DTO>(dto: DTO): Promise<Entity>;
  insertMany<DTO>(dto: DTO[]): Promise<Entity[]>;
  findOne<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity | undefined>;
  findMany<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity[]>;
  findManyWithPagination<DTO>(
    dto: DTO,
    page: number,
    limit: number,
  ): Promise<PaginationResult<Entity>>;
  exist<DTO>(dto: DTO): Promise<boolean>;
  getOneFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity | undefined>;
  getManyFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity[] | undefined>;
  update<DTO>(
    filter: FindConditions<Entity>,
    dto: DTO,
  ): Promise<Entity | undefined>;
  upsert<DTO>(dto: DTO): Promise<Entity | Entity[]>;
  delete<DTO>(dto: DTO): Promise<void>;
}
