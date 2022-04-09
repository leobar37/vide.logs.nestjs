import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client, Intents } from 'discord.js';
import { DICORD_CLIENT } from './constants';
import { DiscordService } from './discord.service';
@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DICORD_CLIENT,
      useFactory: (configService: ConfigService) => {
        const intents = new Intents();
        intents.add(
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_MESSAGE_TYPING,
          Intents.FLAGS.DIRECT_MESSAGES
        );

        const client = new Client({
          intents: intents,
        });

        client.login(configService.get('DICORD_TOKEN'));

        client.on('ready', () => {
          console.log('discord bot is ready :)');
        });

        client.on('error', (err) => {
          console.log(err);
        });
        return client;
      },
      inject: [ConfigService],
    },
    DiscordService,
  ],
  exports: [DICORD_CLIENT, DiscordService],
})
export class DiscordJsModule {}
