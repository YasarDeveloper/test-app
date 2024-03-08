import { MikroORM } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';
import { Student } from '../../entities';
import { StudentController } from './student.controller';

describe('author controller', () => {

  let authorController: StudentController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          dbName: 'postgres',
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Student] }),
      ],
      controllers: [StudentController],
    }).compile();

    authorController = module.get(StudentController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  it(`CRUD`, async () => {
    const res1 = await authorController.create({ name: 'a1', email: 'e1', books: [{ title: 'b1' }, { title: 'b2' }] });
    expect(res1.id).toBeDefined();

    const id = res1.id;

    const res2 = await authorController.find();
    expect(res2).toHaveLength(1);
    expect(res2[0].id).toBeDefined();

    const res3 = await authorController.update(id, { name: 'a2' });
    expect(res3.id).toBeDefined();
  });

});
