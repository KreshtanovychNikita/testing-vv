import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import { Response } from 'express';
import {AppService} from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post()
  handleWebhook(@Body() update: any): any {
    console.log('Received webhook update:', update);

    return {};
  }

  @Get()
  getHello(@Res() res: Response): void {
    res.status(200).send('Hello');
  }

  @Post('post/:searchQuery')
  async getNotification(@Body() requestBody: any, @Param('searchQuery') searchQuery: string): Promise<any> {
    // Відправити отриманий запит до сервісу з параметром шляху
    return this.appService.processNotification(requestBody, searchQuery);
  }
}
