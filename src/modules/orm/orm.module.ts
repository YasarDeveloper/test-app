import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { Users } from '../../entities';
import { Student } from '../../entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Users, Student],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }
