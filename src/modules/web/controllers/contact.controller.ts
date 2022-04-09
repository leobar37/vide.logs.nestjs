import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from '../services';
import { CreatContactDto } from '../dto/contact.dto';
@Controller()
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Get('hello')
  async hello() {
    return this.contactService.sayHello();
  }

  @Post('contact')
  async createContact(@Body() contact: CreatContactDto) {
    return this.contactService.createContact(contact);
  }
}
