import { Injectable } from "@nestjs/common";
import { generate } from "password-hash";
import { InjectModel } from "@nestjs/mongoose";
import { IAccessTokenDocument } from "src/interfaces/access-token.interface";
import { Model } from "mongoose";
import { IMemberDocument } from "src/interfaces/member.interface";

@Injectable()
export class DBAuthenService {

    constructor(
        @InjectModel('AcessToken') private AccessTokenCollection: Model<IAccessTokenDocument>) { }

    //create token
    async generateAccessToken(member: IMemberDocument) {
        const model = {
            memberID: member._id,
            accessToken: generate(Math.random().toString()),
            expireDate: new Date().setMinutes(new Date().getMinutes() + 30)
        };
        const token = await this.AccessTokenCollection.create(model);
        return token.accessToken;
    }

}