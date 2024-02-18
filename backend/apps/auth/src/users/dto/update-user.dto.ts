import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { IsStatus, Status } from '@app/common';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateUserDtoAdmin extends UpdateUserDto {
  @IsOptional()
  @IsArray()
  roles?: RoleDto[];

  @IsOptional()
  @IsStatus()
  status?: Status;
}
