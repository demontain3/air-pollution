import { IsEmail, IsNumber, IsString } from "class-validator";

export class otpEmailDto {
    @IsEmail()
    email: string;

    @IsString()
    otpCode: string;
}

export class resetPasswordEmailDto {
    @IsEmail()
    email: string;

    @IsString()
    link: string;
}