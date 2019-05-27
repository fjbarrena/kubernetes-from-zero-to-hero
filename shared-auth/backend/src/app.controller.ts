import { Controller, Get } from '@nestjs/common';

import { swaggerDocument } from './main';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  root(): object {
    return swaggerDocument;
  }
}
