import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleDto } from './role.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  roles?: RoleDto[];
}
