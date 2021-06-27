import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}
  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const createdAuth = new this.authModel(createAuthDto);
    return createdAuth.save();
  }

  findAll() {    
    return ;
  }

  async findOne(email: string, token:string) {    
    const selectAuth = await this.authModel.findOne({
      email:email
    }).exec();
    const rtn = {idchk : false, token: null};
    if(selectAuth !==null){
      rtn.idchk = true;
    }else {
      rtn.token = token;
    }
    return rtn;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
