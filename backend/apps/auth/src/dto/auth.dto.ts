import { Column } from "typeorm";
import { LoginRequest } from "@app/common/index";
import { IsEmail } from "class-validator";

export class LoginDto implements LoginRequest{

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

}