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
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { join } from 'path';
import { AuthGuard } from '@nestjs/passport';

interface PostData {
  data: string;
}

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //@UseGuards(AuthGuard('local'))
  @Get('/blocks')
  getBlock(@Req() req){
    return this.appService.getBlock();
  }
}