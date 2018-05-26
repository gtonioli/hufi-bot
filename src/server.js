import "babel-polyfill";

const Discord = require("discord.js");
const client = new Discord.Client();

const RaiderIO = require("./raiderio");
const Util = require("./util");

client.on("message", async message => {
  if (message.content.startsWith("!hufi")) {
    const arr = message.content.split(" ");
    if (arr.length >= 2) {
      const response = await RaiderIO.getCharacter(arr[1]);
      if (response.status && response.status === "error") {
        message.reply(response.msg);
      } else {
        message.channel.send(Util.generateEmbed(response));
      }
    }
  }
});

client.login("NDQ4NjU4MTIzOTQ3NzY5ODU2.DeZZkg.51n2DFkf9SdCpyQV1MZOJrB0bY0");
