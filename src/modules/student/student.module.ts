import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  controllers: [StudentController],
  providers: [],
})
export class StudentModule {}
