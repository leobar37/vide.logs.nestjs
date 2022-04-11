import { Injectable } from '@nestjs/common';
import { Client, TextChannel } from 'discord.js';
import { InjectDiscord } from './decorators';

// move this to constants

const guilds = {
  vide: 'vide',
};

const channels = {
  logs: '952050646247419904',
};

@Injectable()
export class DiscordService {
  constructor(@InjectDiscord() private readonly _client: Client) {}

  get client() {
    return this._client;
  }

  getGuild(guildName: keyof typeof guilds) {
    return this.client.guilds.cache.find(
      (guild) => guild.name === guilds[guildName]
    );
  }

  getChannel(channelName: keyof typeof channels) {
    const guild = this.getGuild('vide');
    if (guild) {
      const channel =
        (guild.channels.cache.find(
          (channel) => channel.isText() && channel.id === channels[channelName]
        ) as TextChannel) || null;
      return channel;
    }

    // 871811382448889896
    // https://discord.com/channels/871811382448889896/952050646247419904
    return null;
  }
}
