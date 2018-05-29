import "babel-polyfill";

const Discord = require("discord.js");
const client = new Discord.Client();
const Commands = require("./commands");

client.on("message", message => {
  if (message.content.toLowerCase().startsWith("!hufi")) {
    const arr = message.content.split(" ");
    if (arr.length >= 2) {
      const command = arr[1].toLowerCase();

      if (command === "top") {
        if (arr.length >= 3) {
          let total = parseInt(arr[2]);
          if (isNaN(total) || total <= 0) {
            total = 10
          }

          Commands.rank(message, total);
        }
      } else {
        Commands.raiderIoScore(message, command);
      }
    }
  }
});

client.login("NDQ4NjU4MTIzOTQ3NzY5ODU2.DeZZkg.51n2DFkf9SdCpyQV1MZOJrB0bY0");
