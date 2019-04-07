import RaiderIO from './raiderio';
import Util from './util';

class Commands {
  static async raiderIoScore(message, charName) {
    try {
      const char = await RaiderIO.getCharacter(charName);
      message.channel.send(Util.generateScoreEmbed(char));
    } catch (e) {
      message.reply(e.message);
    }
  }

  static async rank(message, total) {
    try {
      const rank = await RaiderIO.getRank();
      message.channel.send(Util.generateRankEmbed(rank, total));
    } catch (e) {
      message.reply(e.message);
    }
  }
}

export default Commands;
