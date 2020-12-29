import { getCharacter, getRank } from './raiderio';
import { generateScoreEmbed, generateRankEmbed } from './util';

const raiderIoScore = async (message, charName) => {
  try {
    const char = await getCharacter(charName);
    const guild = char.info.characterDetails.character.guild;

    if (guild === null || guild.name !== 'RED Canids') {
      message.channel.send(`O char ${char} não é da guilda :)`);
      return;
    }

    message.channel.send(generateScoreEmbed(char));
  } catch (e) {
    message.reply(e.message);
  }
};

const rank = async (message, total) => {
  try {
    const rank = await getRank();
    message.channel.send(generateRankEmbed(rank, total));
  } catch (e) {
    message.reply(e.message);
  }
};

export { raiderIoScore, rank };
