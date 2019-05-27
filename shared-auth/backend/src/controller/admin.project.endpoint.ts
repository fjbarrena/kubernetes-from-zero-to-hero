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

import { Project } from 'entities/project.entity';
import { ProjectService } from 'service/local/project.respository.service';

@Controller('admin/project')
@ApiUseTags('project')
export class ProjectEndpoint {
  constructor(private readonly service: ProjectService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Petición correcta', type: Project })
  async findAll(): Promise<Project[]> {
    Logger.log('Get /PROJECT', ProjectEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Unknown user', type: Project })
  async findById(@Param('id') id: string): Promise<Project> {
    Logger.log('Get /PROJECT/id', ProjectEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() project: Project) {
    if (project.id <= 0) {
      project.id = undefined;
    }

    Logger.log('Post /PROJECT', ProjectEndpoint.name);
    return this.service.insert(project);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() project: Project) {
    Logger.log('Put /PROJECT', ProjectEndpoint.name);
    if (!project || project.id <= 0) {
      throw new BadRequestException();
    }

    return this.service.update(project);
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
    Logger.log('Delete /PROJECT', ProjectEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const project: Project = new Project();
    project.id = id;
    return this.service.destroy(project);
  }
}
