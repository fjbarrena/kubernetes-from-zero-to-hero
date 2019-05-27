import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { JoinTable, PrimaryGeneratedColumn } from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { Permission } from './permission.entity';
import { Project } from './project.entity';

@Entity('resource')
export class Resource extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'url',
  })
  @ApiModelProperty()
  url: string = null;

  @Column('varchar', { nullable: true, length: 255, name: 'name' })
  @ApiModelProperty()
  name: string = null;

  @Column('varchar', { nullable: true, length: 255, name: 'description' })
  @ApiModelProperty()
  description: string = null;

  @Column('tinyint', { nullable: false, name: 'active', default: true })
  @ApiModelProperty()
  active: boolean = null;

  @ManyToOne(type => Project, project => project.resources, { eager: false })
  project: Project = null;

  @OneToMany(type => Permission, permission => permission.resource, {
    eager: false,
  })
  // @JoinTable()
  permissions: Permission[] = null;
}
