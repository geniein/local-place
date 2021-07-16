import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Header, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('/api')
export class UserController {
  constructor(
    private readonly userService: UserService    
    ) {}

  @Post('/createUser')
  create(@Body() createUserDto: CreateUserDto) {
    console.dir(createUserDto);
    return this.userService.create(createUserDto);
  }
  
  @Post('/login')
  findOne(@Req() req: any, @Body() body:any, @Res() res) { 
    console.log('/login');
    this.userService.findById(body.username).then((response)=>{
      // const rtn = response      
      return res.json(response);
    });
    //return res.json(req.user || false)
    //return this.authService.findOne(req.headers.loginemail);
  }

  // @Get('kakaoAuth')
  // @HttpCode(200)
  // @Header('Content-Type', 'application/json')
  // kakaoAuth(@Req() req, @Res() res):any {    
  //   const rtn = {token : req.headers.authorization, email: '', result: false};                
  //   this.kakaoLogin.setToken(req.headers.authorization);      
  //   let mailChk = this.kakaoLogin.kakaoAccountChk()
  //   .then((resKaKao)=>{
  //     rtn.email = resKaKao.email;
  //     this.authService.findOne(resKaKao.email)
  //     .then((response)=>{
  //       const result =response.result;
  //       if(result == true){
  //         rtn.result = true;
  //         res.send(rtn);
  //       }else{
  //         res.send(rtn);
  //       }        
  //     })
  //   });    
  // }
}
