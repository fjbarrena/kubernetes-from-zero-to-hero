import { ApplicationContext } from 'app.context';
import { GenericService } from './generic.respository.service';
import { Injectable } from '@nestjs/common';
import { Role } from 'entities/role.entity';

@Injectable()
export class RoleService extends GenericService<Role> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }

  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(Role);
    return 'Role';
  }
}
