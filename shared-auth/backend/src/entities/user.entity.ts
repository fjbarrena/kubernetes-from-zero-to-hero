import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

import { ApiModelProperty } from '@nestjs/swagger';
import { GenericEntity } from './generic.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('user')
@Index('email_UNIQUE', ['email'], { unique: true })
export class User extends GenericEntity {
  @Column('int', { nullable: false, primary: true, name: 'id' })
  @PrimaryGeneratedColumn()
  id: number = null;

  @Column('varchar', { nullable: false, length: 255, name: 'email' })
  @ApiModelProperty()
  email: string = null;

  @Column('varchar', {
    nullable: false,
    length: 255,
    name: 'encryptedPassword',
  })
  @ApiModelProperty()
  password: string = null;

  @Column('text', { nullable: true, name: 'portraitUrl' })
  @ApiModelProperty()
  portraitUrl: string = null;

  @Column('varchar', { nullable: false, length: 255, name: 'name' })
  @ApiModelProperty()
  name: string = null;

  @Column('varchar', { nullable: true, length: 255, name: 'surname' })
  @ApiModelProperty()
  surname: string = null;

  @Column('tinyint', { nullable: false, name: 'active', default: true })
  @ApiModelProperty()
  active: boolean = null;

  @ManyToMany(type => Project, project => project.users, { eager: true })
  @JoinTable()
  projects: Project[] = null;

  @Column('varchar', { nullable: true, length: 255, name: 'group' })
  @ApiModelProperty()
  group: string = null;
}
