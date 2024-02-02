import { Column } from "typeorm";
import  {UpdateProfilePictureRequest, UserProfileEditRequest, VerifyOTPRequest }  from "@app/common/index";
import {  IsOptional } from "class-validator";
export class UpdateUserDto implements UserProfileEditRequest{
    @Column()
    @IsOptional()
    email: string;

    @Column()
    @IsOptional()
    username: string;

    @Column()
    @IsOptional()
    category: string;
}

export class UpdateProfilePictureDto implements UpdateProfilePictureRequest{
    @Column()
    @IsOptional()
    profilePicture: string;
}

export class UpdateUserDtoAdmin extends UpdateUserDto{
    @Column()
    @IsOptional()
    role: string;

    @Column()
    @IsOptional()
    status: string;
}

