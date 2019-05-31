import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  ip = require('ip');

  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return 'IP: ' + this.ip.address();
  }
}
