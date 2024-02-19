import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { IsStatus, Status } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'The email of the user.', required: false, example: 'johndoe@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'The password of the user.', required: false, example: 'Password123!' })
  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @ApiProperty({ description: 'The first name of the user.', required: false, example: 'John' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'The last name of the user.', required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName?: string;
}

export class UpdateUserDtoAdmin extends UpdateUserDto {
  @ApiProperty({ description: 'The roles of the user.', required: false, type: [RoleDto], example: [{ name: 'Admin' }] })
  @IsOptional()
  @IsArray()
  roles?: RoleDto[];

  @ApiProperty({ description: 'The status of the user.', required: false, enum: Status, example: Status.Live })
  @IsOptional()
  @IsStatus()
  status?: Status;
}