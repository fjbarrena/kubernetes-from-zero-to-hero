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

import { Role } from 'entities/role.entity';
import { RoleService } from 'service/local/role.respository.service';

@Controller('admin/role')
@ApiUseTags('role')
export class RoleEndpoint {
  constructor(private readonly service: RoleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Role,
  })
  async findAll(): Promise<Role[]> {
    Logger.log('Get /ROLE', RoleEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Role,
  })
  @ApiResponse({ status: 404, description: 'Unknown user', type: Role })
  async findById(@Param('id') id: string): Promise<Role> {
    Logger.log('Get /ROLE/name', RoleEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() role: Role) {
    if (role.id <= 0) {
      role.id = undefined;
    }

    Logger.log('Post /ROLE', RoleEndpoint.name);
    return this.service.insert(role);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() role: Role) {
    Logger.log('Put /ROLE', RoleEndpoint.name);
    if (!role || role.id <= 0) {
      throw new BadRequestException();
    }

    return this.service.update(role);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'No Project found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async delete(@Param('id') id) {
    Logger.log('Delete /ROLE', RoleEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const role: Role = new Role();
    role.id = id;
    return this.service.destroy(role);
  }
}
