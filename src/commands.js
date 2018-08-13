import RaiderIO from './raiderio';
import Util from './util';

class Commands {
  static async raiderIoScore(message, charName) {
    const char = await RaiderIO.getCharacter(charName);

    if (char.status && char.status === "error") {
      message.reply(char.msg);
    } else {
      message.channel.send(Util.generateScoreEmbed(char));
    }
  }

  static async rank(message, total) {
    const rank = await RaiderIO.getRank(total);

    if (rank.status && rank.status === "error") {
      message.reply(rank.msg);
    } else {
      message.channel.send(Util.generateRankEmbed(rank, total));
    }
  }
}

export default Commands;
