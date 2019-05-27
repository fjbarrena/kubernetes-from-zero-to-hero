import { Injectable, Logger } from '@nestjs/common';

import { ITokenStervice } from './itoken.interface';
import { JwtServiceWrapper } from './token.jwt.strategy';
import { Payload } from 'interfaces/payload.interface';
import { TokenDTO } from 'dto/token.dto';

@Injectable()
export class TokenService implements ITokenStervice {
  constructor(protected readonly strategy: JwtServiceWrapper) {}

  async sign(payload: Payload): Promise<TokenDTO> {
    const accessToken = await this.strategy.sign(payload);
    Logger.log('Token signed', TokenService.name);
    return new TokenDTO(accessToken);
  }
  async verify(payload: Payload): Promise<any> {
    return await this.strategy.verify(payload.toString());
  }

  decode(payload: Payload): Promise<TokenDTO> {
    Logger.error('decode: not implemented', TokenService.name);
    throw new Error('Method not implemented.');
  }
}
