import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, QueryOrder, wrap, EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Users } from '../../entities';

@Controller('users')
export class UsersController {

  constructor(
    @InjectRepository(Users) private readonly authorRepository: EntityRepository<Users>,
    private readonly em: EntityManager,
  ) { }

  @Get()
  async find() {
    return await this.authorRepository.findAll({
      orderBy: { id: QueryOrder.DESC },
      limit: 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.authorRepository.findOneOrFail(id, {
    });
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    try {
      const user = await this.authorRepository.findOne({ username: credentials.username });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = credentials.password === user.password;

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
      return {
        userId: user.id
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }


  @Post()
  async create(@Body() body: any) {
    if (!body.username || !body.password) {
      throw new HttpException('One of `name, email` is missing', HttpStatus.BAD_REQUEST);
    }

    const users = this.authorRepository.create(body);
    await this.em.flush();

    return users;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const author = await this.authorRepository.findOneOrFail(id);
    wrap(author).assign(body);
    await this.em.flush();

    return author;
  }

}
