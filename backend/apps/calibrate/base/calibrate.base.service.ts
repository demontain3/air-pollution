import { KafkaProducerService } from '@app/common/config/kafka/kafka-producer.service';
import { processOperator } from '../shared/filterProcessor';
import { QueryParams, FindOptions } from '../src/types';

export class BaseService<T, R> {
  constructor(
    private repository: R,
  ) {}

  async findAllWithFilters(
    queryParams: QueryParams = {},
  ): Promise<{ data: T[], total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'id',
      sortOrder = 'asc',
      filters = [],
    } = queryParams;

    let customFilters: any = {};
    const filtersArray = typeof filters === 'string' ? [filters] : filters;

    filtersArray.forEach((filter: any) => {
      const [key, operatorValue] = filter.split('=');
      let operator: string;
      let value: string;
      if (operatorValue.includes('_')) {
        [operator, value] = operatorValue.split('_');
      } else {
        operator = 'eq';
        value = operatorValue;
      }
      customFilters = { ...customFilters, ...processOperator(operator, value, key) };
    });

    console.log('Custom Filters:', customFilters); // Enhanced logging
    const options: FindOptions = {
      sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
      skip: (page - 1) * limit,
      limit: limit,
      customFilters: customFilters,
    };

    const filterQuery = { ...customFilters };
    console.log('Filter Query:', filterQuery); // Enhanced logging

    const result = await (this.repository as any).getAll(filterQuery, options);
    const { data, total } = result;
    console.log('Results:', data);  // Enhanced logging
    return { data, total };
  }
}