const RaiderIO = require("./raiderio");
const Util = require("./util");

const commands = {
  raiderIoScore: async (message, charName) => {
    const char = await RaiderIO.getCharacter(charName);

    if (char.status && char.status === "error") {
      message.reply(char.msg);
    } else {
      message.channel.send(Util.generateScoreEmbed(char));
    }
  },
  rank: async (message, total) => {
    const rank = await RaiderIO.getRank(total);

    if (rank.status && rank.status === "error") {
      message.reply(rank.msg);
    } else {
      message.channel.send(Util.generateRankEmbed(rank, total));
    }
  }
};

module.exports = commands;
