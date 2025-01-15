import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;
    @IsString()
    price: string;
    @IsString()
    classes: string;
    @IsString()
    total: string;

 

    
}