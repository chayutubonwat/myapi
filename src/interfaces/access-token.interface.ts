
import { Document } from 'mongoose';
export interface IAccessTokenDocument extends Document {
    memberID: any;
    accessToken: string;
    expireDate: Date;
    created: Date;

}