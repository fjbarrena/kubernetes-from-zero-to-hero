import { ApplicationContext } from 'app.context';
import { GenericService } from './generic.respository.service';
import { Group } from 'entities/group.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService extends GenericService<Group> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }

  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(Group);
    return 'Group';
  }
}
