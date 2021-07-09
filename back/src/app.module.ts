import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env',}), //dotenv
    MongooseModule.forRoot(`mongodb://${process.env.DB_ADDR}:27017/services`), // mogoose
  AuthModule, UsersModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consummer: MiddlewareConsumer): void {
    consummer.apply(LoggerMiddleware).forRoutes('*');
  }
}