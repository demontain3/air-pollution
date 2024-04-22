import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ApiResponse<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
}

export function useApi<T>(url: string): ApiResponse<T> {
  const { data, error, isLoading } = useQuery<T, Error>(url, async () => {
    const response = await axios.get(url);
    return response.data;
  });

  return { data: data ?? ({} as T), error: error?.message ?? null, isLoading };
}
