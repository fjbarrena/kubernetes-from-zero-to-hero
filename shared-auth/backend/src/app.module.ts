import { AppController } from './app.controller';
import { ApplicationContext } from 'app.context';
import { DomainEndpoint } from 'controller/admin.domain.endpoint';
import { DomainService } from 'service/local/domain.respository.service';
import { EnvironmentService } from 'environments/environment.service';
import { GroupEndpoint } from 'controller/admin.group.endpoint';
import { GroupService } from 'service/local/group.respository.service';
import { JwtServiceWrapper } from 'service/token/token.jwt.strategy';
import { LoggerModule } from './logger/logger.module';
import { MetadataEndpoint } from 'controller/admin.metadata.endpoint';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PermissionEndpoint } from 'controller/admin.permission.endpoint';
import { PermissionService } from 'service/local/permission.respository.service';
import { ProjectEndpoint } from 'controller/admin.project.endpoint';
import { ProjectService } from 'service/local/project.respository.service';
import { ResourceEndpoint } from 'controller/admin.resource.endpoint';
import { ResourceService } from 'service/local/resource.respository.service';
import { RoleEndpoint } from 'controller/admin.role.endpoint';
import { RoleService } from 'service/local/role.respository.service';
import { TokenService } from 'service/token/token.service';
import { UserEndpoint } from 'controller/admin.user.endpoint';
import { UserService } from './service/local/user.repository.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    DomainEndpoint,
    GroupEndpoint,
    PermissionEndpoint,
    ProjectEndpoint,
    ResourceEndpoint,
    UserEndpoint,
    RoleEndpoint,
    MetadataEndpoint,
  ],
  providers: [
    ApplicationContext,
    EnvironmentService,
    DomainService,
    UserService,
    ProjectService,
    GroupService,
    RoleService,
    PermissionService,
    ResourceService,
    RoleService,
    PassportModule,
    JwtServiceWrapper,
    TokenService,
    LoggerModule,
  ],
})
export class AppModule {
  /*
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware)
        .forRoutes({
            path: '*', method: RequestMethod.ALL,
        });
  }
  */
}
