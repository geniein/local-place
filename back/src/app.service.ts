import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
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

  async kakaoAccountChk():Promise<any> {    
    const email = await this.kakaoUserInfo();
    //console.log(email.data.kakao_account.email);
    return email;    
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