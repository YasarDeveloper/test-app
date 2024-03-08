import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne, Opt, PrimaryKey } from '@mikro-orm/core';
// import { BaseEntity } from './BaseEntity';

@Entity()
export class Users {

  @PrimaryKey()
  id!: number;

  @Property({ length: 256 })
  username!: string;

  @Property()
  password!: string;

  // constructor(name: string, email: string) {
  //   super();
  //   this.name = name;
  //   this.email = email;
  // }
}
