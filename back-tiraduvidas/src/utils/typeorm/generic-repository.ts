import { Injectable } from '@nestjs/common';
import { DeepPartial, EntityTarget, FindConditions, Repository } from 'typeorm';
import { PaginationResult } from './pagination-options';
import { IGenericRepository } from './generic-repository.interface';
import { GenericEntity } from './generic-entity.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class GenericRepository<Entity extends GenericEntity>
  implements IGenericRepository<Entity>
{
  private entityTarget: EntityTarget<Entity>;

  constructor(protected readonly repo: Repository<Entity>) {
    this.entityTarget = this.repo.target;
  }

  async insertOne<DTO>(dto: DTO): Promise<Entity> {
    return this.repo.save(
      Object.assign(this.repo.create(), dto as unknown as DeepPartial<Entity>),
    );
  }

  async insertMany<DTO>(dto: DTO[]): Promise<Entity[]> {
    const data = dto as
      | QueryDeepPartialEntity<Entity>
      | QueryDeepPartialEntity<Entity>[];

    const result = await this.repo
      .createQueryBuilder()
      .insert()
      .into(this.entityTarget)
      .values(data)
      .orIgnore(true)
      .returning('*')
      .execute();

    return result?.raw;
  }

  async findOne<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity | undefined> {
    return await this.repo.findOne(dto as FindConditions<Entity>, {
      relations,
      order: sort,
    });
  }

  async findMany<DTO>(
    dto: DTO,
    relations?: string[],
    sort?: { [K in keyof Entity]: 'ASC' | 'DESC' },
  ): Promise<Entity[]> {
    return await this.repo.find({
      where: dto as FindConditions<Entity>,
      relations,
      order: sort,
    });
  }

  async findManyWithPagination<DTO>(
    dto: DTO,
    page = 1,
    limit = 10,
  ): Promise<PaginationResult<Entity>> {
    const [data, totalRecords] = await this.repo.findAndCount({
      where: dto as FindConditions<Entity>,
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(totalRecords / limit);
    const nextPage = totalRecords - page * limit > 0;

    return {
      data,
      totalRecords,
      nextPage,
      totalPages,
      page,
      limit,
    };
  }

  async exist<DTO>(dto: DTO): Promise<boolean> {
    return !!(await this.repo.count(dto as FindConditions<Entity>));
  }

  async getOneFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity | undefined> {
    return await this.repo
      .createQueryBuilder()
      .relation(this.repo.metadata.targetName, relation)
      .of(item)
      .loadOne();
  }

  async getManyFromARelatedEntity<RelatedEntity>(
    item: Entity,
    relation: string,
  ): Promise<RelatedEntity[] | undefined> {
    return await this.repo
      .createQueryBuilder()
      .relation(this.repo.metadata.targetName, relation)
      .of(item)
      .loadMany();
  }

  async update<DTO>(
    filter: FindConditions<Entity>,
    dto: DTO,
  ): Promise<Entity | undefined> {
    await this.repo.update(filter, dto as QueryDeepPartialEntity<Entity>);
    return await this.repo.findOne(filter);
  }

  async upsert<DTO>(dto: DTO): Promise<Entity | Entity[]> {
    const data = dto as unknown as DeepPartial<Entity>;

    return await this.repo.save(data);
  }

  async delete<DTO>(dto: DTO): Promise<void> {
    await this.repo.delete(dto as FindConditions<Entity>);
  }
}
