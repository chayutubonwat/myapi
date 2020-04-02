import { Controller, Get } from "@nestjs/common";

@Controller('api/member')
export class MemberController {

    @Get('data')
    getUserLogin() {
        return [];

    }



}