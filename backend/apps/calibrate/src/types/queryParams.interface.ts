export interface QueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: string[] | Record<string, any>; // Allow filters to be an object
    filterObject?: string;
  }
  