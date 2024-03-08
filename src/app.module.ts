import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './modules/orm/orm.module';
import { UsersModule } from './modules/users/users.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [OrmModule, UsersModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
