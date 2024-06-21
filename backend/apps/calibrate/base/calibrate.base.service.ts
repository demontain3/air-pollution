import { processOperator } from '../shared/filterProcessor';
import { QueryParams } from '../src/types';

export class BaseService<T, R> {
  constructor(private repository: R) {}

  async findAllWithFilters(
    queryParams: QueryParams = {},
  ): Promise<{ data: T[]; total: number }> {
    let {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
      filters = [],
      // filterObject,
    } = queryParams;
    let customFilters = { };
    if (filters && typeof filters === 'string') {
      filters = [filters];
    }
    if (filters && filters.length) {
      filters.forEach((filter: string) => {
        const [key, operatorValue] = filter.split('=');
        let operator;
        let value;
        if (operatorValue.includes('_')) {
          [operator, value] = operatorValue.split('_');
        } else {
          operator = '=';
          value = operatorValue;
        }
        customFilters = {
          ...customFilters,
          ...processOperator(operator, value, key),
        };
      });
    }
    const options = {
      sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
      skip: (parseInt(String(page), 10) - 1) * parseInt(String(limit), 10),
      limit: parseInt(String(limit), 10),
      customFilters: customFilters,
    };
    const filterQuery = { ...customFilters }; // Use the id and populateField parameters to create the filter

    const result = await (this.repository as any).getAll(filterQuery, options);
    const { data, total } = result;
    return { data, total };
  }
}
