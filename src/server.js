import '@babel/polyfill';
import 'dotenv/config';
import { Client } from 'discord.js';
import { raiderIoScore, rank } from './commands';
import { version } from './config';

const client = new Client();

client.on('message', async (message) => {
  if (message.content.toLowerCase().startsWith('!hufi')) {
    const arr = message.content.split(' ');
    if (arr.length >= 2) {
      const command = arr[1].toLowerCase();

      if (command === 'top') {
        let total = 10;
        if (arr.length >= 3) {
          total = parseInt(arr[2]);
          if (isNaN(total) || total <= 0) {
            total = 10;
          }
        }

        await rank(message, total);
      } else if (command === 'version') {
        message.reply(version);
      } else {
        await raiderIoScore(message, command);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
