import axios from 'axios';

interface FetchParams {
  entity: string; // Entity name, e.g., 'routes'
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: string[]; // Additional query parameters as filters
}

export const fetchAPI = async ({
  entity,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filters = [],
}: FetchParams): Promise<any> => {
  try {
    const filterParams = filters.map(filter => `filters=${encodeURIComponent(filter)}`).join('&');
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_CALIBRATE}/${entity}/list/filter?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&${filterParams}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
