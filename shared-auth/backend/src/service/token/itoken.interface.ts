import { Payload } from 'interfaces/payload.interface';
import { TokenDTO } from 'dto/token.dto';

export interface ITokenStervice {

  verify(payload: Payload): Promise<TokenDTO>;

  sign(payload: Payload | any): Promise<TokenDTO>;

  decode(payload: Payload): Promise<TokenDTO>;
}