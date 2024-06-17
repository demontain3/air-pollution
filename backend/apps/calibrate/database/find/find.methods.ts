import { PopulateOptions } from 'mongoose';

export function applyProjection(query: any, projection?: any): any {
  return projection ? query.select(projection) : query;
}

export function applyLimit(query: any, limit?: number): any {
  return limit !== undefined ? query.limit(limit) : query;
}

export function applySkip(query: any, skip?: number): any {
  return skip !== undefined ? query.skip(skip) : query;
}

export function applySort(query: any, sort?: any): any {
  return sort ? query.sort(sort) : query;
}

export function applyPopulation(
  query: any,
  populate?: string | PopulateOptions | (string | PopulateOptions)[]
): any {
  return populate ? query.populate(populate) : query;
}

export function applyCustomFilters(query: any, customFilters?: any): any {
  if (customFilters) {
    for (const key in customFilters) {
      if (customFilters.hasOwnProperty(key)) {
        query = query.where(key).equals(customFilters[key]);
      }
    }
  }
  return query;
}
