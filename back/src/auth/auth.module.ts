import { Module } from '@nestjs/common';
import { AuthService, KakaoLogin } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './entities/auth.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
//passport
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
//jwt
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {JwtStrategy} from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Auth.name, schema: AuthSchema
  }]),
UsersModule,
PassportModule,
JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: {expiresIn: '60s'},
})],
  controllers: [AuthController],
  providers: [AuthService, KakaoLogin, LocalStrategy, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
