import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Header, Res } from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('/api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kakaoLogin: KakaoLogin,
    ) {}

  @Post('/createUser')
  create(@Body() createAuthDto: CreateAuthDto) {
    console.dir(createAuthDto);
    return this.authService.create(createAuthDto);
  }

  @Post('/auth/login')
  findOne(@Req() req: any, @Body() body:any, @Res() res) {
    // this.authService.findOne
    console.log(body);
    console.log(req.user || false);
    return res.json(req.user || false)
    //return this.authService.findOne(req.headers.loginemail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
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
      this.authService.findOne(resKaKao.email)
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
