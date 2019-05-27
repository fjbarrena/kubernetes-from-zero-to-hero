import { ApplicationContext } from 'app.context';
import { Domain } from 'entities/domain.entity';
import { GenericService } from './generic.respository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DomainService extends GenericService<Domain> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }

  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(Domain);
    return 'Domain';
  }

  //   async findAll(): Promise<Domain[]> {
  //     return await super.findAll();
  //   }

  //   async findOne(condition: any): Promise<Domain> {
  //     return await super.findOne(condition);
  //   }
}
