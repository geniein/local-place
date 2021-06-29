import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService, KakaoLogin } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env',}), //dotenv
  //MongooseModule.forRoot(`mongodb://${process.env.DB_ADDR}:27017/local_place`), // mogoose
  //AuthModule
],
  controllers: [AppController],
  providers: [AppService, KakaoLogin],
})
export class AppModule implements NestModule{
  configure(consummer: MiddlewareConsumer): void {
    consummer.apply(LoggerMiddleware).forRoutes('*');
  }
}