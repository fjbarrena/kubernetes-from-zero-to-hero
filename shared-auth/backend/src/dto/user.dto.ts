import { ApiModelProperty } from '@nestjs/swagger';
import { Domain } from 'entities/domain.entity';
import { GenericDTO } from './generic.dto';
import { User } from 'entities/user.entity';

/**
 * Los DTOs deben ser exactamente igual que las entidades de bases de datos.
 * Es la única forma que hemos encontrado para que queden bien documentados en Swagger.
 */
export class UserDTO extends GenericDTO<User> {
  @ApiModelProperty() id: number = null;

  @ApiModelProperty() portraitUrl: string = null;

  @ApiModelProperty() email: string = null;

  @ApiModelProperty() password: string = null;

  @ApiModelProperty() name: string = null;

  @ApiModelProperty() surname: string = null;

  @ApiModelProperty() active: boolean = null;

  @ApiModelProperty() domains: Domain[] = [];

  constructor(object?: any) {
    super();
    this.create(object);
  }

  getEntity() {
    return new User();
  }
}
