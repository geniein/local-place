import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import { Auth, AuthDocument } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}  
  //passport
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.pwd === pass) {
      const { pwd, ...result } = user;
      return result;
    }
    return null;
  }
  //jwt
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {    
    const createUser = new this.authModel(createAuthDto);
    return createUser.save();
  }

  findAll() {    
    return ;
  }

  async findOne(email: string, pwd?: string) {    
    const selectAuth = await this.authModel.findOne({
     email     
    }).exec();
    console.log(pwd);
    const rtn = {result:false};
    if(selectAuth !==null){
      console.log(selectAuth);
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
