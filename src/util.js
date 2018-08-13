import {guild, realm, region} from './config';

const DG_NAMES = {
  "EOA": "Olho de Azshara",
  "DHT": "Bosque Corenegro",
  "VOTW": "Câmara das Guardiãs",
  "LOWR": "Karazhan Inferior",
  "UPPR": "Karazhan Superior",
  "SEAT": "Sede do Triunvirato",
  "NL": "Covil de Neltharian",
  "COS": "Pátio das Estrelas",
  "BRH": "Castelo Corvo Negro",
  "MOS": "Gorja das Almas",
  "ARC": "O Arcâneo",
  "HOV": "Salões da Bravura",
  "COEN": "Catedral da Noite Eterna"
};

class Util {
  static generateScoreEmbed(char) {
    const name = char.info.characterDetails.character.name;
    let embed = {
      title: name,
      url: "https://raider.io/characters/" + region + "/" + realm + "/" + name,
      description: "Score: **" + Math.round(char.info.characterDetails.mythicPlusScores.all.score) + "**",
      thumbnail: {
        url: "https:" + char.info.characterDetails.character.thumbnailUrl
      }
    };

    const runs = char.runs.dungeons;
    runs.sort((a, b) => {
      return (b.score || 0) - (a.score || 0)
    });

    let fields = [];

    runs.forEach((run) => {
      let field = {
        name: "__" + DG_NAMES[run.dungeon.short_name] + "__",
        value: "",
        inline: true
      };

      if (run.num_chests !== undefined) {
        field.value += "Chave: +" + run.mythic_level + "\n";
        field.value += "Score: " + run.score.toFixed(1) + "\n";
        field.value += "Upgrade: ";

        if (run.num_chests === 0) {
          field.value += ":poop:";
        } else {
          for (let i = 0; i < run.num_chests; i++) {
            field.value += ":star:";
          }
        }

        field.value += "\n";
        field.value += "Tempo: " + Util.msToText(run.clear_time_ms);
      } else {
        field.value += "Chave ainda não realizada :thinking:";
      }

      fields.push(field);
    });

    embed.fields = fields;

    return {
      embed: embed
    };
  }

  static generateRankEmbed(chars, total) {
    let embed = {
      title: "Top " + total,
      url: "https://raider.io/guilds/" + region + "/" + realm + "/" + guild + "/mythic-plus-characters"
    };

    let fields = [];

    for (let i = 0; i < Math.min(chars.length, total); i++) {
      const char = chars[i];
      let field = {
        name: "**" + (i + 1) + "** - __" + char.character.name + "__",
        value: char.character.class.name + " - " + char.character.spec.name + "\nScore: " + Math.round(char.score),
        inline: true
      };

      fields.push(field);
    }

    embed.fields = fields;

    return {
      embed: embed
    };
  }

  static msToText(ms) {
    let seconds = Math.floor(ms / 1000);
    let minute = Math.floor(seconds / 60);
    let hour = Math.floor(minute / 60);

    seconds = seconds % 60;
    minute = minute % 60;
    hour = hour % 24;

    return ("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2) + ":" + ("0" + seconds).slice(-2);
  }
}

export default Util;
