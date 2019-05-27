import { ConnectionOptions } from 'typeorm';

export class Environment {
  outboundMailConfiguration: EnvOutBoundMailConfiguration;
  databaseConnection: ConnectionOptions;
  serverConfiguration: EnvServerConfiguration;
  swaggerConfiguration: EnvSwaggerConfiguration;
  authenticationConfiguration: EnvSecurityConfiguration;
  boostrapConfiguration: BoostrapConfiguration;
}

export class EnvOutBoundMailConfiguration {
  host: string;
  port: number;
  secure: false;
  username: string;
  password: string;
}

export class EnvServerConfiguration {
  port: number;
}

export class EnvSwaggerConfiguration {
  title: string;
  description: string;
  version: string;
  basePath: string;
}

export enum EnvironmentEnum {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

export class EnvSecurityConfiguration {
  jwtId: string;
  jwtKey: string;
  cipherKey: string;
  algorithm: string;
  expiresIn: string;
  defaultStrategy: string;
}

export class BoostrapConfiguration {
  dbConnectionTimeout: number;
  dbConnectionMaxTrials: number;
}
