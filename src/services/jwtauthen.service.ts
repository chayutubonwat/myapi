import { Injectable, BadRequestException } from "@nestjs/common";
import { IAuthen } from "src/interfaces/authen.interface";
import { IMemberDocument } from "src/interfaces/member.interface";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthenService implements IAuthen {


    private secretKey: string = 'web api test';

    async generateAccessToken(member: IMemberDocument) {
        const payload = { email: member.email };
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });




    }

}