import { Logger } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/postgresql';

const logger = new Logger('MikroORM');


export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'yasar123',
  dbName: 'postgres',
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  debug: true,
});