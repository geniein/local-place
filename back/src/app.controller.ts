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
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { join } from 'path';

interface PostData {
  data: string;
}

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,    
//    private readonly kakaoLogin: KakaoLogin,
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
    console.log(postBody);
    return JSON.stringify({ data: postBody });
  }
  // Post Body (2)
  @Post('/data2')
  @Header('Content-Type', 'application/json')
  postData2(@Body('data') postBody: string): PostData {
    return { data: postBody };
  }

  // @Get('kakaoAuth')
  // @HttpCode(200)
  // @Header('Content-Type', 'application/json')
  // kakaoAuth(@Req() req, @Res() res):any {    
  //   const rtn = {token : null};                
  //   this.kakaoLogin.setToken(req.headers.authorization);      
  //   let mailChk = this.kakaoLogin.kakaoAccountChk().then((rtn)=>{          
  //     res.send(rtn);
  //   });    
  // }

}