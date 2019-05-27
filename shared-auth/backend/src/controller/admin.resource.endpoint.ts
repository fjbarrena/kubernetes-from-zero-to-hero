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

import { Resource } from 'entities/resource.entity';
import { ResourceService } from 'service/local/resource.respository.service';

@Controller('admin/resource')
@ApiUseTags('resource')
export class ResourceEndpoint {
  constructor(private readonly service: ResourceService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Resource,
  })
  async findAll(): Promise<Resource[]> {
    Logger.log('Get /RESOURCE', ResourceEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Resource,
  })
  @ApiResponse({ status: 404, description: 'Unknown user', type: Resource })
  async findById(@Param('id') id: string): Promise<Resource> {
    Logger.log('Get /RESOURCE/name', ResourceEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() resource: Resource) {
    if (resource.id <= 0) {
      resource.id = undefined;
    }
    Logger.log('resource ' + JSON.stringify(resource));
    Logger.log('Post /RESOURCE', ResourceEndpoint.name);
    return this.service.insert(resource);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() resource: Resource) {
    Logger.log('Put /RESOURCE', ResourceEndpoint.name);
    if (!resource || resource.id <= 0) {
      throw new BadRequestException();
    }
    Logger.log('resource ' + JSON.stringify(resource));
    return this.service.update(resource);
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
    Logger.log('Delete /RESOURCE', ResourceEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const resource: Resource = new Resource();
    resource.id = id;
    return this.service.destroy(resource);
  }
}
