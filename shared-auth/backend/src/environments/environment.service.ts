import * as fs from 'fs';

import { Environment, EnvironmentEnum } from './environment';
import { Injectable, Logger } from '@nestjs/common';

export const DEV = 'development';
export const PROD = 'production';
export const FILENAME = 'environment';

@Injectable()
export class EnvironmentService {

  private applicationEnvironment: Environment;

  public get(): Environment {
    if (!this.applicationEnvironment) {
      this.loadEnvironmentParams();
    }
    return this.applicationEnvironment;
  }

  private loadEnvironmentParams(): void {

    let filename: string = __dirname + '/' + FILENAME + '.';
    let env: string;

    try {
      env = process.env.NODE_ENV.toUpperCase();
    } catch (ex) {
      throw Error(`Unable to parse environmment ${process.env.NODE_ENV}`);
    }
    switch (env) {

      case EnvironmentEnum.DEVELOPMENT:
        filename = filename.concat('dev.json');
        Logger.log('Using DEVELOPMENT Properties', EnvironmentService.name);
        break;

      case EnvironmentEnum.PRODUCTION:
        filename = filename.concat('prod.json');
        Logger.log('Using PRODUCTION Properties', EnvironmentService.name);
        break;

      default:
        throw Error(`Unknown environmment ${process.env.NODE_ENV}`);
    }

    this.applicationEnvironment = JSON.parse(fs.readFileSync(filename, 'utf-8'));
  }

}