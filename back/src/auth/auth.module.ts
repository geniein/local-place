import { Module } from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
//passport
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
//jwt
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import { Passport } from 'passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '60s'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoLogin, LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {}
