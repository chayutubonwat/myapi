import { Controller, Get, Post, Body, BadRequestException } from "@nestjs/common";
import { RegisterModel } from "src/models/register.model";
import { ValidationPipe } from "src/pipes/validations.pipe";
import { AppService } from "src/services/app.service";
import { memberSchema } from "src/schemas/member.schema";
import { LoginModel } from "src/models/login.model";

@Controller('api/account')
export class AccountController {
    constructor(private service: AppService) {

    }

    @Post('register')
    register(@Body(new ValidationPipe()) body: RegisterModel) {
        return this.service.onRegister(body);
    }

    @Post('login')// login 
    login(@Body(new ValidationPipe()) body: LoginModel) {
        console.log(body);
        return this.service.onLogin(body);

    }

}