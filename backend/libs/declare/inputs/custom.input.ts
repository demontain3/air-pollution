import { IsNotEmpty, IsOptional } from 'class-validator';
import { IWhere } from '../utils/types';

export class IPaginationDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;
}

export class GetOneInputDto<T> {
  @IsNotEmpty()
  where: IWhere<T>;
}

export class GetManyInputDto<T> {
  @IsOptional()
  where?: IWhere<T>;

  @IsOptional()
  pagination?: IPaginationDto;

  @IsOptional()
  order?: FindOptionsOrderDto<T>;

  @IsOptional()
  dataType?: IDataType;
}

export class FindOptionsOrderDto<T> {
  key: string | Record<string, FindOptionsOrderDto<T>>;
  direction?: 'ASC' | 'DESC' | 'asc' | 'desc';
  nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
}

export type IDataType = 'count' | 'data' | 'all';
