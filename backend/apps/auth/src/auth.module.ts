import {  Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './modules/shared/shared.module';
import { SettingService } from './modules/shared/services/setting.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [SettingService],
      useFactory: (settingService: SettingService) =>
        settingService.typeOrmUseFactory,
    }
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}