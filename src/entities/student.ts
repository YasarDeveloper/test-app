import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Student {

  @PrimaryKey()
  id!: number;

  @Property()
  age: number;

  @Property()
  name: string;

  @Property({ nullable: true })
  createduser: number;

  @Property({ nullable: true })
  updateduser: number;

  @Property({ length: 256 })
  subject1: string;

  @Property()
  mark1: number;

  @Property({ length: 256 })
  subject2: string;

  @Property()
  mark2: number;

  @Property({ length: 256, nullable: true })
  createdUsername?: string;
  
  @Property({ length: 256, nullable: true })
  updatedUsername?: string;
}
