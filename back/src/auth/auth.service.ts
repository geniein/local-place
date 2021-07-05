import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>,
  ) {}  
  async create(createAuthDto: CreateAuthDto): Promise<Auth> {    
    const createUser = new this.authModel(createAuthDto);
    return createUser.save();
  }

  findAll() {    
    return ;
  }

  async findOne(email: string) {    
    const selectAuth = await this.authModel.findOne({
      email:email
    }).exec();    
    const rtn = {result:false};
    if(selectAuth !==null){
      rtn.result = true;
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


@Injectable()
export class KakaoLogin {
  check: boolean;
  accessToken: string;
  private http: HttpService;
  
  constructor() {
    this.check = false;
    this.http = new HttpService();
    this.accessToken = '';
  }
  
  loginCheck(): void {
    this.check = !this.check;
    return;
  }
  async login(url: string, headers: any): Promise<any> {
    return await this.http.post(url, '', { headers }).toPromise();
  }
  async kakaoUserInfo():Promise<any> {    
    const _url = 'https://kapi.kakao.com/v2/user/me';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };    
    return await this.http.get(_url,{ headers: _header }).toPromise();    
  }

  async kakaoAccountChk() {    
    let rtn={
      token: this.accessToken,
      email: '',      
    };
    const kakaoInfo = await this.kakaoUserInfo();          
    
    rtn.email = kakaoInfo.data.kakao_account.email;

    return rtn;    
  }

  setToken(token: string): boolean {
    this.accessToken = token;
    return true;
  }
  async logout(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,  
    };
    return await this.http.post(_url, '', { headers: _header }).toPromise();
  }
  async deleteLog(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/user/unlink';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await this.http.post(_url, '', { headers: _header }).toPromise();
  }
  async getProfile(): Promise<any> {
    const _url = 'https://kapi.kakao.com/v1/api/talk/profile';
    const _header = {
      Authorization: `bearer ${this.accessToken}`,
    };
    return await this.http.post(_url, '', { headers: _header }).toPromise();
  }
}
