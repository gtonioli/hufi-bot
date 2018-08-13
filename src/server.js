import 'babel-polyfill';
import 'dotenv/config';
import Commands from './commands';
import {Client} from 'discord.js/src';

const version = require('../package.json').version;
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

client.login("NDQ4NjU4MTIzOTQ3NzY5ODU2.DeZZkg.51n2DFkf9SdCpyQV1MZOJrB0bY0");
