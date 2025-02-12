import { Observable } from 'rxjs';

import { BaseModel } from '../../../shared/models/api/base.model';
import { Pageable } from '../../../shared/models/api/pageable.model';

export interface Sort<T extends BaseModel> {
  /** Field of the model that will be sorted */
  field: keyof T & string;
  /** Sorting order. May be -1 (descending) or 1 (ascending) */
  order: 'asc' | 'desc';
}

export interface PageRequest<T extends BaseModel> {
  /** Number of items we want per page */
  size: number;
  /** Index of the page we want to fetch */
  page: number;
  /** How we want the data to be sorted */
  sort?: Sort<T>;
}

export interface LoadMore<T extends BaseModel> extends PageRequest<T> {
  /** Indicates if more data can be loaded */
  canLoadMore: boolean;
}

export interface Page<T extends BaseModel> {
  /** Data fetched by the API */
  content: T[];
  /** Information about the pagination returned by the api */
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface Detail<T extends BaseModel> {
  /** Data fetched by the API */
  data: T;
}

export type PaginatedEndpoint<T extends BaseModel, Q> = (
  pageable: PageRequest<T>,
  query: Q,
) => Observable<Page<T>>;
