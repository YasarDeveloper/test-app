import { MikroORM } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../../mikro-orm.config';
import { Users } from '../../entities';
import { UsersController } from './users.controller';

describe('author controller', () => {

  let authorController: UsersController;
  let orm: MikroORM;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          dbName: 'postgres',
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Users] }),
      ],
      controllers: [UsersController],
    }).compile();

    authorController = module.get(UsersController);
    orm = module.get(MikroORM);
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  it(`CRUD`, async () => {
    const res1 = await authorController.create({ name: 'a1', email: 'e1', books: [{ title: 'b1' }, { title: 'b2' }] });
    expect(res1.id).toBeDefined();
    expect(res1.username).toBe('a1');
    expect(res1.password).toBe('e1');

    const id = res1.id;

    const res2 = await authorController.find();
    expect(res2).toHaveLength(1);
    expect(res2[0].id).toBeDefined();
    expect(res2[0].username).toBe('a1');
    expect(res2[0].password).toBe('e1');

    const res3 = await authorController.update(id, { name: 'a2' });
    expect(res3.id).toBeDefined();
    expect(res3.username).toBe('a2');
    expect(res3.password).toBe('e1');
  });

});
