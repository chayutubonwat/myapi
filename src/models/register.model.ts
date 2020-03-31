import { IRegister } from "src/interfaces/app.interface";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { IsComparePassword } from "src/pipes/validations.pipe";

export class RegisterModel implements IRegister {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[A-z0-9]{6,15}$/)
    password: string;

    @IsNotEmpty()
    @IsComparePassword('password')
    cpassword: string;

}