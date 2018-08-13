import 'babel-polyfill';
import 'dotenv/config';
import Commands from './commands';
import {version} from './config';
import {Client} from 'discord.js/src';

const client = new Client();

client.on("message", async message => {
  if (message.content.toLowerCase().startsWith("!hufi")) {
    const arr = message.content.split(" ");
    if (arr.length >= 2) {
      const command = arr[1].toLowerCase();

      if (command === "top") {
        let total = 10;
        if (arr.length >= 3) {
          total = parseInt(arr[2]);
          if (isNaN(total) || total <= 0) {
            total = 10
          }
        }

        await Commands.rank(message, total);
      } else if (command === "version") {
        message.reply(version);
      } else {
        await Commands.raiderIoScore(message, command);
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
