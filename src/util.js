import querystring from 'querystring';
import { guild, realm, region } from './config';
import slugify from 'slugify';

const DG_NAMES = {
  SD: 'Profundezas Sanguinárias',
  PF: 'Empéstia',
  SOA: 'Torres da Ascensão',
  TOP: 'Teatro da Dor',
  DOS: 'O Outro Lado',
  HOA: 'Salões da Expiação',
  MISTS: 'Brumas de Tirna Scithe',
  NW: 'A Chaga Necrótica',
};

const getChartUrl = (region, realm, name) => {
  const slug = slugify(region + '_' + realm + '_' + name, {
    lower: true,
  });
  const now = new Date();
  return 'https://s3.amazonaws.com/hufi-char-history-prod/charts/evolution/' + slug + '.png?t=' + now.getTime();
};

const generateScoreEmbed = (char) => {
  const name = char.info.characterDetails.character.name;
  let embed = {
    title: name,
    url: 'https://raider.io/characters/' + region + '/' + realm + '/' + name,
    description: 'Score: **' + Math.round(char.info.characterDetails.mythicPlusScores.all.score) + '**',
    thumbnail: {
      url: 'https:' + char.info.characterDetails.character.thumbnailUrl,
    },
    image: {
      url: getChartUrl(region, realm, name),
    },
  };

  const runs = char.runs.dungeons;
  runs.sort((a, b) => {
    return (b.score || 0) - (a.score || 0);
  });

  let fields = [];

  runs.forEach((run) => {
    let field = {
      name: '__' + DG_NAMES[run.dungeon.short_name] + '__',
      value: '',
      inline: true,
    };

    if (run.num_chests !== undefined) {
      field.value += 'Chave: +' + run.mythic_level + '\n';
      field.value += 'Score: ' + run.score.toFixed(1) + '\n';
      field.value += 'Upgrade: ';

      if (run.num_chests === 0) {
        field.value += ':poop:';
      } else {
        for (let i = 0; i < run.num_chests; i++) {
          field.value += ':star:';
        }
      }

      field.value += '\n';
      field.value += 'Tempo: ' + msToText(run.clear_time_ms);
    } else {
      field.value += 'Chave ainda não realizada :thinking:';
    }

    fields.push(field);
  });

  embed.fields = fields;

  return {
    embed: embed,
  };
};

const generateRankEmbed = (chars, total) => {
  let embed = {
    title: 'Top ' + total,
    url: 'https://raider.io/guilds/' + region + '/' + realm + '/' + querystring.escape(guild) + '/mythic-plus-characters',
  };

  let fields = [];

  for (let i = 0; i < Math.min(chars.length, total); i++) {
    const char = chars[i];
    let field = {
      name: '**' + (i + 1) + '** - __' + char.character.name + '__',
      value: char.character.class.name + ' - ' + char.character.spec.name + '\nScore: ' + Math.round(char.score),
      inline: true,
    };

    fields.push(field);
  }

  embed.fields = fields;

  return {
    embed: embed,
  };
};

const msToText = (ms) => {
  let seconds = Math.floor(ms / 1000);
  let minute = Math.floor(seconds / 60);
  let hour = Math.floor(minute / 60);

  seconds = seconds % 60;
  minute = minute % 60;
  hour = hour % 24;

  return ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + seconds).slice(-2);
};

module.exports = { generateScoreEmbed, generateRankEmbed, msToText };
