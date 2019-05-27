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

import { Group } from 'entities/group.entity';
import { GroupService } from 'service/local/group.respository.service';

@Controller('admin/group')
@ApiUseTags('group')
export class GroupEndpoint {
  constructor(private readonly service: GroupService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Group,
  })
  async findAll(): Promise<Group[]> {
    Logger.log('Get /GROUP', GroupEndpoint.name);
    return this.service.findAll();
  }

  @Get(':name')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Unknown group', type: Group })
  async findById(@Param('name') name: string): Promise<Group> {
    Logger.log('Get /GROUP/name', GroupEndpoint.name);
    return this.service.findOne({ name });
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() group: Group) {
    if (group.id <= 0) {
      group.id = undefined;
    }

    Logger.log('Post /GROUP', GroupEndpoint.name);
    return this.service.insert(group);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() group: Group) {
    Logger.log('Put /GROUP', GroupEndpoint.name);
    if (!group || group.id <= 0) {
      throw new BadRequestException();
    }

    return this.service.update(group);
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
    Logger.log('Delete /GROUP', GroupEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const group: Group = new Group();
    group.id = id;
    return this.service.destroy(group);
  }
}
