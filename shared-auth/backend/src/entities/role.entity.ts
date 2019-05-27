import { Column, Entity, Index, ManyToMany, ManyToOne } from 'typeorm';
import { JoinTable, PrimaryGeneratedColumn } from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { Group } from './group.entity';
import { Permission } from './permission.entity';
import { Project } from './project.entity';

@Entity('role')
@Index('role_UNIQUE', ['id'], { unique: true })
export class Role extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('varchar', { nullable: false, length: 255, name: 'name' })
  @ApiModelProperty()
  name: string = null;

  @Column('varchar', { nullable: false, length: 255, name: 'description' })
  @ApiModelProperty()
  description: string = null;

  @Column('tinyint', { nullable: false, name: 'active', default: true })
  @ApiModelProperty()
  active: boolean = null;

  @ManyToMany(type => Permission, permissions => permissions.role, {
    eager: true,
  })
  @JoinTable()
  permissions: Permission[] = null;

  @ManyToMany(type => Group, group => group.roles, {
    eager: true,
  })
  @JoinTable()
  groups: Group[] = null;

  @ManyToOne(type => Project, project => project.roles)
  project: Project = null;
}
