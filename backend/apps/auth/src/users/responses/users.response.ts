import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@app/common';
import { RoleDto } from '../dto/role.dto';

export class UserResponse {
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user.' })
  email: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user.' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
  lastName: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg', description: 'The profile picture of the user.' })
  profilePicture?: string;

  @ApiProperty({ example: Status.Live, description: 'The status of the user.' })
  status: Status;

  @ApiProperty({ example: false, description: 'Whether the user is verified.' })
  isVerified: boolean;

  // @ApiProperty({ 
  //   type: RoleDto, 
  //   isArray: true, 
  //   example: [{ name: 'Admin' }, { name: 'User' }], 
  //   description: 'The roles of the user.' 
  // })
  // roles?: RoleDto[];
}