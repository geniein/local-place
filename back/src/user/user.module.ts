import { Module } from '@nestjs/common';
import { UserService} from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
//passport
import { PassportModule } from '@nestjs/passport';
//jwt
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{
    name: User.name, schema: UserSchema
  }])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
