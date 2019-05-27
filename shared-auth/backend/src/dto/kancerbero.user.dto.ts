import { UserDTO } from './user.dto';

/**
 * Los DTOs deben ser exactamente igual que las entidades de bases de datos.
 * Es la única forma que hemos encontrado para que queden bien documentados en Swagger.
 */
export class SharedAuthUserDTO extends UserDTO {
  constructor() {
    super();
  }
}