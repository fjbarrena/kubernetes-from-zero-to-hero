import { Column, Entity, ManyToMany } from 'typeorm';
import { JoinTable, PrimaryGeneratedColumn } from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { Role } from './role.entity';

@Entity('group')
export class Group extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('text', { nullable: true, name: 'description' })
  @ApiModelProperty()
  description: string = null;

  @Column('varchar', { nullable: false, length: 255, name: 'name' })
  @ApiModelProperty()
  name: string = null;

  @Column('tinyint', { nullable: false, name: 'active', default: true })
  active: boolean = null;

  @ManyToMany(type => Role, role => role.groups)
  roles: Role[] = null;
}
