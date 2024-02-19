import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser, Roles } from '@app/common';
import { User } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserDto, UpdateUserDtoAdmin } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserResponse } from './responses/users.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserResponse })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'Return the current user.', type: UserResponse})
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserResponse})
  async updateMe(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles('Admin')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserResponse})
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Return the user.', type: UserResponse})
  async getUser(@Param('id') id: number) {
    return await this.usersService.getOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserDtoAdmin })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserResponse})
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDtoAdmin,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type:[UserResponse]})
  async getAllUsers(@Query() query: any): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post('upload-profile-picture')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload profile picture' })
  @ApiResponse({ status: 200, description: 'The profile picture has been successfully uploaded.'})
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // specify the path where the files should be saved
        filename: (req, file, callback) => {
          const name = Date.now() + extname(file.originalname); // generate a unique filename
          callback(null, name);
        },
      }),
    }),
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateProfilePicture(user, file.path);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({ status: 200, description: 'The password has been successfully changed.', type:UserResponse})
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.changePassword(updatePasswordDto, user);
  }
}
