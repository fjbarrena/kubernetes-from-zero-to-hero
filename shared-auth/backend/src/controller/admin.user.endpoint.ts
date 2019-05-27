import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { User } from 'entities/user.entity';
import { UserService } from 'service/local/user.repository.service';

/**
 * Hemos tenido que renunciar a la implementación de un @Controller genérico para operaciones de CRUD
 * para que Swagger documente bien los endpoints.
 * Resulta que Typescript, de momento, es incapaz de devolverte el tipo de un genérico (<T>), por lo que
 * es imposible documentar una API en base a genéricos hasta que el Reflect.js funcione mejor
 */
@Controller('admin/user')
@ApiUseTags('user')
export class UserEndpoint {
  constructor(private readonly service: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Petición correcta', type: User })
  findAll(): Promise<User[]> {
    Logger.log('Get /USERS', UserEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Petición correcta', type: User })
  @ApiResponse({ status: 404, description: 'Unknown user', type: User })
  async findById(@Param('id') id: string): Promise<User> {
    Logger.log('Get /USERS/id', UserEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() user: User): Promise<any> {
    if (!user || !user.password || !user.email) {
      throw new BadRequestException();
    }
    if (user.id === 0 || user.id === -1) {
      user.id = undefined;
    }
    Logger.log('POST /USERS', UserEndpoint.name);
    return this.service.create(user);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() user: User): Promise<any> {
    Logger.log('PUT /USERS', UserEndpoint.name);
    if (!user || !user.id || user.id < 0) {
      throw new BadRequestException();
    }
    return this.service.update(user);
  }

  @Put('/password')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async updatePassword(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('newpassword') newpassword,
  ): Promise<any> {
    Logger.log('PUT /USER/PASSWORD');
    if (!email || !password || !newpassword) {
      throw new BadRequestException();
    }
    return this.service.updatePassword(email, password, newpassword);
  }

  @Delete()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'No user found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async delete(@Param('id') id) {
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const user: User = new User();
    user.id = id;
    return this.service.destroy(user);
  }
}
