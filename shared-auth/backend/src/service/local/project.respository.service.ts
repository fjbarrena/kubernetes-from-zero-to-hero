import { ApplicationContext } from 'app.context';
import { GenericService } from './generic.respository.service';
import { Injectable } from '@nestjs/common';
import { Project } from 'entities/project.entity';

@Injectable()
export class ProjectService extends GenericService<Project> {
  constructor(private readonly applicationContext: ApplicationContext) {
    super();
    // We need to do this way because of the order Nestjs injects dependencies
    super.init();
  }
  public getApplicationConext(): ApplicationContext {
    return this.applicationContext;
  }

  async getRepository(): Promise<string> {
    this.repository = this.databaseConnection.getRepository(Project);
    return 'Project';
  }
  async getAuthenticationMetaByProject(id: string): Promise<any> {
    const project: Project = await super.findById({ id });

    // TODO this should be moved to project configuration
    const authenticationMetaData = {
      jwtValidation: 'true',
      algorithm: this.applicationContext.getApplicationEnvironment()
        .authenticationConfiguration.algorithm,
      secret: this.applicationContext.getApplicationEnvironment()
        .authenticationConfiguration.cipherKey,
      expiration: this.applicationContext.getApplicationEnvironment()
        .authenticationConfiguration.expiresIn,
    };
    return authenticationMetaData;
  }
}
