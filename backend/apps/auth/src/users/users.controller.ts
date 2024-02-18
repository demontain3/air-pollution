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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async deleteUser(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async getUser(@Param('id') id: number) {
    return await this.usersService.getOne({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDtoAdmin,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async getAllUsers(@Query() query: any): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post('upload-profile-picture')
  @UseGuards(JwtAuthGuard)
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
  async changePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.changePassword(updatePasswordDto, user);
  }
}
