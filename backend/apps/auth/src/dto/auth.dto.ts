import { Column } from "typeorm";
import { LoginRequest } from "../auth";
import { IsEmail } from "class-validator";

export class LoginDto implements LoginRequest{

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

}