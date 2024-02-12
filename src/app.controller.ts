import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Post()
  handleWebhook(@Body() update: any): any {
    console.log('Received webhook update:', update);

    return {};
  }
}
