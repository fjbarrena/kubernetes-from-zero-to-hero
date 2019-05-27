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

import { Domain } from 'entities/domain.entity';
import { DomainService } from 'service/local/domain.respository.service';

@Controller('admin/domain')
@ApiUseTags('domain')
export class DomainEndpoint {
  constructor(private readonly service: DomainService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Petición correcta', type: Domain })
  async findAll(): Promise<Domain[]> {
    Logger.log('Get /DOMAIN', DomainEndpoint.name);
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Petición correcta',
    type: Domain,
  })
  @ApiResponse({ status: 404, description: 'Unknown user', type: Domain })
  async findById(@Param('id') id: string): Promise<Domain> {
    Logger.log('Get /DOMAIN/id', DomainEndpoint.name);
    return this.service.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error...' })
  async create(@Body() domain: Domain) {
    if (domain.id <= 0) {
      domain.id = undefined;
    }

    Logger.log('Post /DOMAIN', DomainEndpoint.name);
    return this.service.insert(domain);
  }

  @Put()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async edit(@Body() domain: Domain) {
    Logger.log('Put /DOMAIN', DomainEndpoint.name);
    if (!domain || domain.id <= 0) {
      throw new BadRequestException();
    }

    return this.service.update(domain);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'No domain found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async delete(@Param('id') id) {
    Logger.log('Delete /DOMAIN', DomainEndpoint.name);
    if (!id || id <= 0) {
      throw new BadRequestException();
    }
    const domain: Domain = new Domain();
    domain.id = id;
    return this.service.destroy(domain);
  }
}
