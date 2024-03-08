import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Student, Users } from '../../entities';

@Controller('student')
export class StudentController {
  authorRepository: any;

  constructor(
    @InjectRepository(Student) private readonly studentRepository: EntityRepository<Student>,
    @InjectRepository(Users) private readonly usersRepository: EntityRepository<Users>,
    private readonly em: EntityManager,
  ) { }

  @Get()
  @Get()
  async find() {
    const students = await this.studentRepository.findAll({
      orderBy: { id: QueryOrder.DESC },
      limit: 20,
    });

    const userIds = students.map(student => student.createduser);

    const users = await this.usersRepository.find({
      id: { $in: userIds },
    });

    const userIdToUsername = new Map(users.map(user => [user.id, user.username]));

    students.forEach(student => {
      student.createdUsername = userIdToUsername.get(student.createduser);
      student.updatedUsername = userIdToUsername.get(student.updateduser);
    });

    return students;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.studentRepository.nativeDelete({ id });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.studentRepository.findOneOrFail(id, {
    });
  }

  @Post()
  async create(@Body() body: any) {
    const users = this.studentRepository.create(body);
    await this.em.flush();

    return users;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const author = await this.studentRepository.findOneOrFail(id);
    wrap(author).assign(body);
    await this.em.flush();

    return author;
  }

}
