import { Column } from "typeorm";
import  {CreateUserRequest }  from "../../auth";
import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateUserDto implements CreateUserRequest{
    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    category: string;

    @Column()
    @IsOptional()
    profilePicture: string;
}
