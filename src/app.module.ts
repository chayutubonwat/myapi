import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { memberSchema } from './schemas/member.schema';
import { AccountController } from './controller/account.controller';
import { DBAuthenService } from './services/dbauthen.service';
import { accessTokenSchema } from './schemas/access-token.schema';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/member_db'),
    MongooseModule.forFeature([

      { name: 'Member', schema: memberSchema },
      { name: 'AcessToken', schema: accessTokenSchema },

    ])
  ],
  controllers: [
    AppController,
    AccountController],
  providers: [
    AppService,
    DBAuthenService]
})
export class AppModule { }
