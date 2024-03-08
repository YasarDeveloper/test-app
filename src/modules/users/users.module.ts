import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule { }
