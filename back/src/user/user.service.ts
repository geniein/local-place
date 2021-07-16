import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {compare} from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,        
  ) {}  
  // //passport
  // async validateUser(email: string, pass: string): Promise<any> {    
  //   const user = await this.usersService.findOne(email);
  //   //if (user && compare(pass,user.pwd)) {
  //     if (user && pass === user.pwd  ) {
  //     const { pwd, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  // //jwt
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {    
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  findAll() {    
    return ;
  }

  async findOne(email: string, pwd?: string) {    
    const selectUser = await this.userModel.findOne({
     email     
    }).exec();
    console.log(pwd);
    const rtn = {result:false};
    if(selectUser !==null){
      console.log(selectUser);
      rtn.result = true;
    }

    return rtn;
  }

  async findById(email: string) {        
    const selectUser = await this.userModel.findOne({
     email     
    }).exec();        
    return selectUser;
  }
}
