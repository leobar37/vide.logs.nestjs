import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import faker from '@faker-js/faker';
import { nanoid } from 'nanoid';
interface User {
  id: string;
  name: string;
  lastName: string;
}

const makeUser = (): User => {
  return {
    id: nanoid(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers() {
    return Array(50).fill(null).map(makeUser);
  }
}
