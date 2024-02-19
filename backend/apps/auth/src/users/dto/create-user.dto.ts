import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleDto } from './role.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user.' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user.' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123456789wwE#', description: 'The password of the user.' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ 
    type: RoleDto, 
    isArray: true, 
    example: [{ name: 'Admin' }, { name: 'User' }], 
    description: 'The roles of the user.' 
  })
  @IsOptional()
  @IsArray()
  roles?: RoleDto[];
}
