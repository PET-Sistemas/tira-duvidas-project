export interface IPaginationOptions {
  page: number;
  limit: number;
}

export class PaginationOptions implements IPaginationOptions {
  page: number;
  limit: number;
}

export class PaginationResult<T> {
  data: T[];
  totalRecords: number;
  nextPage?: boolean;
  totalPages?: number;
  page?: number;
  limit?: number;
}
