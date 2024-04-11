import { Controller, Get, Inject, LoggerService, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController created');
  }

  @Get()
  async getUsers(): Promise<User[]> {
    this.logger.log('GetUsers called');
    return await this.userService.findAll();
  }

  @Post()
  async addUser(): Promise<User> {
    const user = {
      username: 'testUser',
      password: 'testPassword',
    } as User;
    return await this.userService.create(user);
  }
}
