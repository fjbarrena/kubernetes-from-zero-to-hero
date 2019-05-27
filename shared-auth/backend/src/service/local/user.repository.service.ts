import * as crypto from 'crypto';

import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { ApplicationContext } from 'app.context';
import { GenericService } from './generic.respository.service';
import { User } from 'entities/user.entity';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }
  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(User);
    return 'User';
  }

  async create(user: User): Promise<any> {
    user.password = this.encryptPassword(user.email, user.password);
    return await super.insert(user);
  }

  async updatePassword(
    email: string,
    plainPassword: string,
    plainNewPassword: string,
  ): Promise<any> {
    const user: User = await this.validateUser(email, plainPassword);
    user.password = this.encryptPassword(email, plainNewPassword);
    const modUser: User = await super.update(user);
    return modUser;
  }

  async validateUser(email: string, plainPassword: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Missing email parameter');
    }
    if (!plainPassword) {
      throw new BadRequestException('Missing password parameter');
    }
    const password = this.encryptPassword(email, plainPassword);
    const login = {
      email,
      password,
    };
    try {
      return await super.findOne(login);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private encryptPassword(email: string, password: string): string {
    // TODO poner las properties fuera, esta encriptacion tiene que ver con SharedAuths
    const customUserCipher =
      this.getApplicationConext().getApplicationEnvironment()
        .authenticationConfiguration.cipherKey + email;
    const cipher = crypto.createCipher('aes192', customUserCipher);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }
}
