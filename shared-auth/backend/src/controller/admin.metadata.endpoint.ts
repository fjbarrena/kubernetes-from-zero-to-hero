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

import { ProjectService } from 'service/local/project.respository.service';
import { User } from 'entities/user.entity';
import { UserService } from 'service/local/user.repository.service';

/**
 * Hemos tenido que renunciar a la implementación de un @Controller genérico para operaciones de CRUD
 * para que Swagger documente bien los endpoints.
 * Resulta que Typescript, de momento, es incapaz de devolverte el tipo de un genérico (<T>), por lo que
 * es imposible documentar una API en base a genéricos hasta que el Reflect.js funcione mejor
 */
@Controller('admin/metadata')
@ApiUseTags('metadata')
export class MetadataEndpoint {
  constructor(private readonly service: ProjectService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Petición correcta', type: User })
  @ApiResponse({ status: 404, description: 'Unknown user', type: User })
  async findById(@Param('id') id: string): Promise<any> {
    Logger.log('Get /AUTHENTICATION/id', MetadataEndpoint.name);
    return this.service.getAuthenticationMetaByProject(id);
  }
}
