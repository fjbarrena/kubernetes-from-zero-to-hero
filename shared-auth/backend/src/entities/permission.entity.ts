import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from './resource.entity';
import { Role } from './role.entity';

@Entity('permission')
export class Permission extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('varchar', { nullable: true, length: 255, name: 'methods' })
  @ApiModelProperty()
  methods: string = null;

  @ManyToOne(type => Role, role => role.permissions, {
    eager: false,
  })
  role: Role = null;

  @ManyToOne(type => Resource, resource => resource.permissions, {
    eager: true,
  })
  resource: Resource = null;
}
