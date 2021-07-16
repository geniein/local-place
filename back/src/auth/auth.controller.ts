import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Header, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService, KakaoLogin } from './auth.service';

@Controller('/api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly kakaoLogin: KakaoLogin,
    ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async findOne(@Req() req: any, @Body() body:any, @Res() res) {    
    console.log(body);
    console.log(req.user);
    res.json(await this.authService.login(req.user));    
  }
  
  @Get('kakaoAuth')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  kakaoAuth(@Req() req, @Res() res):any {    
    const rtn = {token : req.headers.authorization, email: '', result: false};                
    this.kakaoLogin.setToken(req.headers.authorization);      
    let mailChk = this.kakaoLogin.kakaoAccountChk()
    .then((resKaKao)=>{
      rtn.email = resKaKao.email;
      this.userService.findOne(resKaKao.email)
      .then((response)=>{
        const result =response.result;
        if(result == true){
          rtn.result = true;
          res.send(rtn);
        }else{
          res.send(rtn);
        }        
      })
    });    
  }
}
