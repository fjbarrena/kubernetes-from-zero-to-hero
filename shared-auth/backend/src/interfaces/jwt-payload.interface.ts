import { Payload } from './payload.interface';

export interface JwtPayload extends Payload {
  email: string;
}
