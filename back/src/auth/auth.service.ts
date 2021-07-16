import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt'
import {UserService} from '../user/user.service';
import {compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(    
    private userService: UserService,
    private jwtService: JwtService    
  ) {}  
  //passport
  async validateUser(email: string, pass: string): Promise<any> {    
    const user = await this.userService.findById(email);
    // if (user && compare(pass, user.pwd)) {
    if (user && pass === user.pwd.toString()  ) {
      delete user.pwd
      return user;
    }
    return null;
  } 
  //jwt
  async login(user: any) {
    const payload = { username: user.email.toString()};
    return {
      access_token: this.jwtService.sign(payload),      
    };
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
