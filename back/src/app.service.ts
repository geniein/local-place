import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  
  getHello(): string {
    return 'Hello World!';
  }  
  async getBlock() {
    const block = await this.httpService.get('http://localhost:3001/blocks').toPromise();    
    return block.data;
    //return this.httpService.get('http://localhost:3001/blocks');
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
      result: false
    };
    const kakaoInfo = await this.kakaoUserInfo();    
    const tmp = 'test@hotmail.co.kr'

    if(kakaoInfo.data.kakao_account.email === tmp){
      rtn.result = true;      
    }else{
      rtn.email = kakaoInfo.data.kakao_account.email;
    }    
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