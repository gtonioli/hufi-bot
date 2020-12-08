import { getCharacter, getRank } from './raiderio';
import { generateScoreEmbed, generateRankEmbed } from './util';

const raiderIoScore = (message, charName) => {
  try {
    const char = await getCharacter(charName);
    message.channel.send(generateScoreEmbed(char));
  } catch (e) {
    message.reply(e.message);
  }
};

const rank = (message, total) => {
  try {
    const rank = await getRank();
    message.channel.send(generateRankEmbed(rank, total));
  } catch (e) {
    message.reply(e.message);
  }
};

export {
  raiderIoScore,
  rank
};
