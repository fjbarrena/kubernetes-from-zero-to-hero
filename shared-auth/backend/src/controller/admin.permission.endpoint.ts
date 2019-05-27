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

import { Permission } from 'entities/permission.entity';
import { PermissionService } from 'service/local/permission.respository.service';

@Controller('admin/permission')
@ApiUseTags('permission')
export class PermissionEndpoint {
  constructor(private readonly service: PermissionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Permission,
  })
  async findAll(): Promise<Permission[]> {
    Logger.log('Get /PERMISSION', PermissionEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Permission,
  })
  @ApiResponse({ status: 404, description: 'Unknown user', type: Permission })
  async findById(@Param('id') id: string): Promise<Permission> {
    Logger.log('Get /PERMISSION/name', PermissionEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() persmission: Permission) {
    if (persmission.id <= 0) {
      persmission.id = undefined;
    }

    Logger.log('Post /PERMISSION', Permission.name);
    return this.service.insert(persmission);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() persmission: Permission) {
    Logger.log('Put /PERMISSION', PermissionEndpoint.name);
    if (!persmission || persmission.id <= 0) {
      throw new BadRequestException();
    }

    return this.service.update(persmission);
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
    Logger.log('Delete /PERMISSION', PermissionEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const persmission: Permission = new Permission();
    persmission.id = id;
    return this.service.destroy(persmission);
  }
}
