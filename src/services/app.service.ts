import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { IRegister, IAccount, RoleAccount, ILogin } from 'src/interfaces/app.interface';
import { generate, verify } from 'password-hash';
import { DBAuthenService } from './dbauthen.service';

@Injectable()
export class AppService {
  constructor(
    private authenService: DBAuthenService,
    @InjectModel('Member') private memberCollection: Model<IMemberDocument>) {

  }

  //Register
  async onRegister(body: IRegister) {
    const count = await this.memberCollection.countDocuments({ email: body.email });
    if (count > 0) throw new BadRequestException('email is exits!!!!');

    delete body.cpassword;
    const model: IAccount = body;
    model.password = generate(model.password);
    model.image = '';
    model.position = '';
    model.role = RoleAccount.Member;
    const modelItem = await this.memberCollection.create(model);
    modelItem.password = '';
    return modelItem;


  }

  async onLogin(body: ILogin) {
    const member = await this.memberCollection.findOne({ email: body.email });
    if (!member) throw new BadRequestException('ไม่มีผู้ใช้งานในระบบ');
    if (verify(body.password, member.password)) {
      return { accessToken: await this.authenService.generateAccessToken(member) };
      ;
    }
    throw new BadRequestException('อีเมล์หรือรหัสผ่านไม่ถูกต้อง');



  }

}
