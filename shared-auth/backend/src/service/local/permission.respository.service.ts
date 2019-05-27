import { ApplicationContext } from 'app.context';
import { GenericService } from './generic.respository.service';
import { Injectable } from '@nestjs/common';
import { Permission } from 'entities/permission.entity';

@Injectable()
export class PermissionService extends GenericService<Permission> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }

  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(Permission);
    return 'Permission';
  }
}
