import * as jwt from 'jsonwebtoken';

import { ApplicationContext } from 'app.context';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/';

@Injectable()
export class JwtServiceWrapper {
  jwtService: JwtService;

  constructor(private readonly context: ApplicationContext) {
    const applicationEnvironment = context.getApplicationEnvironment();
    this.jwtService = new JwtService({
      secretOrPrivateKey:
        applicationEnvironment.authenticationConfiguration.jwtKey,
      signOptions: {
        expiresIn: applicationEnvironment.authenticationConfiguration.expiresIn,
      },
    });
  }

  sign(payload: string | any | Buffer): string {
    return this.jwtService.sign(payload);
  }

  verify<T extends object = any>(token: string): T {
    return this.jwtService.verify(token);
  }

  decode(
    token: string,
    options: jwt.DecodeOptions,
  ):
    | null
    | {
        [key: string]: any;
      }
    | string {
    return this.jwtService.decode(token, options);
  }
}
