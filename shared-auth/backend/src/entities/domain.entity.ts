import { Column, Entity, Index, ManyToMany, OneToMany } from 'typeorm';
import { JoinTable, PrimaryGeneratedColumn } from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { Project } from './project.entity';

@Entity('domain')
@Index('name_UNIQUE', ['name'], { unique: true })
export class Domain extends GenericEntity {
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

  @OneToMany(type => Project, project => project.domain, {
    eager: false,
  })
  @ApiModelProperty()
  projects: Project[] = null;
}
