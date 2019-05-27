import { ApiModelProperty } from '@nestjs/swagger';
import { Domain } from 'entities/domain.entity';
import { GenericDTO } from './generic.dto';
import { User } from 'entities/user.entity';

/**
 * Los DTOs deben ser exactamente igual que las entidades de bases de datos.
 * Es la única forma que hemos encontrado para que queden bien documentados en Swagger.
 */
export class ProjectDTO extends GenericDTO<Domain> {
  @ApiModelProperty() id: number = null;

  @ApiModelProperty() name: string = null;

  @ApiModelProperty() description: string = null;

  @ApiModelProperty() active: boolean = null;

  @ApiModelProperty() users: User[] = null;
  //   @ApiModelProperty() resources: Resources[] = null;
  //   @ApiModelProperty() role: Roles[] = null;
  //   @ApiModelProperty() domains: Domains[] = null;
  //   @ApiModelProperty() groups: Group[] = null;

  constructor(object?: any) {
    super();
    this.create(object);
  }

  getEntity(): Domain {
    return new Domain();
  }
}
