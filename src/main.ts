import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS before other middleware or routes
  app.enableCors();

  // Ensure the database and update schema
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  // Start the application
  await app.listen(3001);
}

bootstrap();
