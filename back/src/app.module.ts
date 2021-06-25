import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService, KakaoLogin } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
  })],
  controllers: [AppController],
  providers: [AppService, KakaoLogin],
})
export class AppModule {}