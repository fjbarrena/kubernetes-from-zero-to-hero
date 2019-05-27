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
import { Domain } from './domain.entity';
import { GenericEntity } from './generic.entity';
import { Group } from './group.entity';
import { Resource } from './resource.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('project')
@Index('project_UNIQUE', ['name'], { unique: true })
export class Project extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('varchar', { nullable: false, length: 255, name: 'name' })
  @ApiModelProperty()
  name: string = null;

  @Column('varchar', { nullable: true, length: 255, name: 'description' })
  @ApiModelProperty()
  description: string = null;

  @Column('tinyint', { nullable: false, name: 'active', default: true })
  @ApiModelProperty()
  active: boolean = null;

  @OneToMany(type => Resource, resource => resource.project, {
    eager: true,
  })
  resources: Resource[] = null;

  @OneToMany(type => Role, role => role.project, {
    eager: true,
  })
  roles: Role[] = null;

  @ManyToOne(type => Domain, domain => domain.projects, {
    eager: true,
  })
  domain: Domain = null;

  @ManyToMany(type => User, user => user.projects, {
    eager: false,
  })
  users: User[] = null;
}
