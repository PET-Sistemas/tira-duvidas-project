import { IPaginationOptions } from './pagination-options';

export function addPagination(paginationOptions: IPaginationOptions) {
  let { limit } = paginationOptions;

  if (limit > 50) {
    limit = 50;
  }

  return {
    skip: (paginationOptions.page - 1) * limit,
    take: limit,
  };
}
