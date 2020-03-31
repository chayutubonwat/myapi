import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { IRegister, IAccount, RoleAccount } from 'src/interfaces/app.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Member') private memberCollection: Model<IMemberDocument>) {

  }

  //Register
  async onRegister(body: IRegister) {
    const count = await this.memberCollection.countDocuments({ email: body.email });
    if (count > 0) throw new BadRequestException('email is exits!!!!');

    delete body.cpassword;
    const model: IAccount = body;
    model.image = '';
    model.position = '';
    model.role = RoleAccount.Member;
    return await this.memberCollection.create(model);


  }

}
