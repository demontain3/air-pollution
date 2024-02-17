import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersModule } from './users/users.module';
import { User } from '@app/common';

@Module({
  imports: [
    DatabaseModule.forFeature([User]),
    LoggerModule,
    UsersModule,
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
