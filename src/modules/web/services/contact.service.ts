import { DiscordService } from '@App/libs/discord';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { MessageEmbed, Util } from 'discord.js';
import { CreatContactDto } from '../dto/contact.dto';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { readJsonFromPath } from '@App/utils';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
const dtoToMessage = (contact: CreatContactDto) => {
  const content = [
    `------------------------------------------------------`,
    `
    **Nuevo contacto en Vide**
  `,
    `**Nombre:** ${contact.fullName}`,
    `**Email:** ${contact.email}`,
    `**Mensaje:** ${contact.message}`,
    `**Teléfono:** ${contact.phoneNumber}`,
    `**Servicios:** ${contact.services.join(', ')}`,
    `**Fecha:** ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`,
    `------------------------------------------------------`,
  ].join('\n');

  return content;
};

@Injectable()
export class ContactService {
  constructor(
    private discordService: DiscordService,
    private configService: ConfigService
  ) {}

  async sayHello() {
    const channel = this.discordService.getChannel('logs');
    await channel.sendTyping();
    await channel.send('Hello world!');
    return { res: 'Hello!' };
  }

  async createContact(contact: CreatContactDto) {
    const credentials = await readJsonFromPath(resolve('.', 'secret.json'));

    const doc = new GoogleSpreadsheet(this.configService.get('SHEET_ID'));

    await doc.useServiceAccountAuth(credentials);

    await doc.loadInfo();

    const sheet = doc.sheetsByTitle.contact;

    await sheet.addRows([
      {
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        message: contact.message,
        service: contact.services.join(', '),
      },
    ]);

    const channel = this.discordService.getChannel('logs');
    await channel.sendTyping();
    const content = dtoToMessage(contact);
    const messagePromises = Util.splitMessage(content).map((message) =>
      channel.send(message)
    );

    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setTitle('Enlace a google Docs')
      .setURL(
        'https://docs.google.com/spreadsheets/d/1EpVQTrk_sDXw_WDws2TOAZieDu8yi0Z_OSe4Xj8DbJI/edit?usp=sharing'
      );

    messagePromises.push(
      channel.send({
        embeds: [embed],
      })
    );

    await Promise.all(messagePromises);

    return { result: contact };
  }
}
