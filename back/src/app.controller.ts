import {
  Controller,
  Get,
  Param,
  Header,
  Redirect,
  Post,
  Body,
  Res,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import { AppService, KakaoLogin } from './app.service';
import { Request, Response } from 'express';
import { join } from 'path';

interface PostData {
  data: string;
}

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,    
    private readonly kakaoLogin: KakaoLogin,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  // Header : HTML
  @Get('/index')
  @Header('Content-Type', 'text/html')
  index(): string {
    return '<h2>Nest HTML</h2>';
  }

  // Redirect
  @Get('/index/*')
  @Redirect('/', 302)
  indexRedirect(): void {
    return;
  }

  // Post Body (1)
  @Post('/data')
  @Header('Content-Type', 'application/json')
  postData(@Body('data') postBody: string): string {
    return JSON.stringify({ data: postBody });
  }
  // Post Body (2)
  @Post('/data2')
  @Header('Content-Type', 'application/json')
  postData2(@Body('data') postBody: string): PostData {
    return { data: postBody };
  }

  @Get('kakaoAuth')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  kakaoAuth(@Req() req, @Res() res):any {    
    const rtn = {token : null};                
    this.kakaoLogin.setToken(req.headers.authorization);      
    let mailChk = this.kakaoLogin.kakaoAccountChk().then((rtn)=>{          
      res.send(rtn);
    });    
  }

  @Get('kakaoLogin')
  @Header('Content-Type', 'text/html')
  getKakaoLoginPage(): string {
    return `
      <div>        
        <form action="/api/kakaoLoginLogic" method="GET">
          <input type="submit" value="로그인" />
        </form>
        <form action="/api/kakaoLogout" method="GET">
          <input type="submit" value="로그아웃 및 연결 끊기" />
        </form>
      </div>
    `;
  }
  @Get('kakaoLoginLogic')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogic(@Res() res): void {

    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = process.env.KAKAORESTAPIKEY;     
    const _redirectUrl = 'http://localhost:3055/api/kakaoLoginLogicRedirect';
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }
  @Get('kakaoLoginLogicRedirect')
  @Header('Content-Type', 'text/html')
  kakaoLoginLogicRedirect(@Query() qs, @Res() res): void {
    console.log(qs.code);
    const _restApiKey = process.env.KAKAORESTAPIKEY; 
    const _redirect_uri = 'http://localhost:3055/api/kakaoLoginLogicRedirect';
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${qs.code}`;
    const _headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',        
      },
    };
    this.kakaoLogin
      .login(_hostName, _headers)
      .then((e) => {        
        console.log(`TOKEN : ${e.data['access_token']}`);
        this.kakaoLogin.setToken(e.data['access_token']);
        this.kakaoLogin.getProfile().then((response)=>{
          console.log(response);
          return res.send(`
          <div>
            <h2>축하합니다!</h2>
            <p>카카오 로그인 성공하였습니다 :)</p>
            <a href="/kakaoLogin">메인으로</a>
          </div>
        `);
        }).catch((err)=>{
          console.log(err);
          return res.send('error');  
        })       
      })
      .catch((err) => {
        console.log(err);
        return res.send('error');
      });
  }
  @Get('kakaoLogout')
  kakaoLogout(@Res() res): void {
    console.log(`LOGOUT TOKEN : ${this.kakaoLogin.accessToken}`);    
    this.kakaoLogin
      .deleteLog()
      .then((e) => {
        return res.send(`
          <div>
            <h2>로그아웃 완료(연결끊기)</h2>
            <a href="/kakaoLogin">메인 화면으로</a>
          </div>
        `);
      })
      .catch((e) => {
        console.log(e);
        return res.send('DELETE ERROR');
      });    
    // this.kakaoLogin
    //   .logout()
    //   .then((e) => {
    //     return res.send(`
    //       <div>
    //         <h2>로그아웃 완료(토큰만료)</h2>
    //         <a href="/kakaoLogin">메인 화면으로</a>
    //       </div>
    //     `);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     return res.send('LogOUT ERROR');
    //   });
  }
}