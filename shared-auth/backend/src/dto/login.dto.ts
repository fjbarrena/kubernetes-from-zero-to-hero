import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiModelProperty() user: string = null;

  @ApiModelProperty() password: string = null;

  // @ApiModelProperty() domain: string = null;

  @ApiModelProperty() project: string = null;

  // @ApiModelProperty() authprovider: string = null;

  constructor(object?: LoginDTO) {
    if (object) {
      this.user = object.user;
      this.password = object.password;
      // this.domain = object.domain;
      // this.authprovider = object.authprovider;
      this.project = object.project;
    }
  }
  public static isValid(loginDTO: LoginDTO) {
    // Password is not mandatory in all cases
    return loginDTO && loginDTO.user && loginDTO.project;
  }
}
