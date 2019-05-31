import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  ip = require('ip');
  champions: string[] = [
    'Annie',
    'Lux',
    'Aatrox',
    'Gragas',
    'Teemo',
    'Pyke',
    'Leona',
    'Sona',
    'Soraka',
    'Morgana',
    'Nasus',
    'Darius',
    'Draven',
    'Singed',
  ];

  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    const randomInt = Math.floor(Math.random() * 13) + 0;
    return {
      message: this.ip.address() + ' - ' + this.champions[randomInt] + '',
      champion:
        'https://ddragon.leagueoflegends.com/cdn/9.11.1/img/champion/' +
        this.champions[randomInt] +
        '.png',
    };
  }
}
