import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto, SignUpDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { ExtendedFindOptions, Role, User } from '@app/common';
import { Status } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.validateCreateUser(createUserDto.email);
    if(checkUser === null){
      throw new UnauthorizedException('User already exists');
    }
    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles: createUserDto.roles?.map((roleDto) => new Role(roleDto)),
    });
    user.status = Status.Live;
    return this.usersRepository.create(user);
  }

  async signup(signUpDto: SignUpDto){
    await this.validateCreateUser(signUpDto.email);
    const user = new User({
      ...signUpDto,
      password: await bcrypt.hash(signUpDto.password, 10),
    });
    user.status = Status.Live;
    return this.usersRepository.create(user);
  }

  private async validateCreateUser(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ email: email });
    } catch (err: any) {
      console.error('Error occurred while validating user:', err);
      return null;
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (passwordIsValid === false) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.isVerified === false) {
      throw new UnauthorizedException('Please verify before logging in');
    }
    return user;
  }

  async getOne(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate({ where:{ id: id} }, updateUserDto);
  }

  async delete(id: number) {
    return this.usersRepository.findOneAndDelete({ id });
  }

  async findAll(options: ExtendedFindOptions<User>):Promise<{ data: User[]; total: number }>{
    return await this.usersRepository.findAll(options);
  }

  async changePassword(updatePasswordDto: UpdatePasswordDto, user: User) {
    const { oldPassword, newPassword, confirmedNewPassword } =
      updatePasswordDto;
    if (newPassword !== confirmedNewPassword) {
      throw new UnprocessableEntityException('Passwords do not match');
    }
    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);
    if (passwordIsValid === false) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const password = await bcrypt.hash(newPassword, 10);

    const id = user.id;
    return this.usersRepository.findOneAndUpdate(
      { where:{id:id} },
      { password: password },
    );
  }

  async updateProfilePicture(user: User, filePath: string): Promise<User> {
    const id = user.id;
    return this.usersRepository.findOneAndUpdate(
      { where:{id: id} },
      { profilePicture: filePath },
    );
  }
}
