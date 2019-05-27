import { ApiModelProperty } from '@nestjs/swagger';
import { Domain } from 'entities/domain.entity';
import { GenericDTO } from './generic.dto';
import { UserDTO } from './user.dto';

/**
 * Los DTOs deben ser exactamente igual que las entidades de bases de datos.
 * Es la única forma que hemos encontrado para que queden bien documentados en Swagger.
 */
export class DomainDTO extends GenericDTO<Domain> {
  @ApiModelProperty() id: number = null;

  @ApiModelProperty() name: string = null;

  @ApiModelProperty() description: string = null;

  @ApiModelProperty() active: boolean = null;

  @ApiModelProperty() users: UserDTO[] = null;

  constructor(object?: any) {
    super();
    this.create(object);
  }

  getEntity(): Domain {
    return new Domain();
  }
}
