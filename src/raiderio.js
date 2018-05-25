const axios = require("axios");

const functions = {
  getCharacter: async (name) => {
    let char = {};
    await axios.get("https://raider.io/api/characters/us/azralon/" + name + "/?season=season-7.3.2&tier=21").then(async (response) => {
      const runs = await functions.getCharacterDetails(response.data.characterDetails.character.id);
      char = {
        info: response.data,
        runs: runs
      };
    }).catch(() => {
      char = {
        status: "error",
        msg: "Char não encontrado =("
      }
    });

    return char;
  },
  getCharacterDetails: async (id) => {
    let details = {};
    await axios.get("https://raider.io/api/characters/mythic-plus-scored-runs?season=season-7.3.2&role=all&mode=scored&affixes=all&date=all&characterId=" + id).then((response) => {
      details = response.data;
    }).catch(() => {
      details = {
        status: "error",
        msg: "Erro ao buscar informações =("
      };
    });

    return details;
  },
  getBrName: (shortName) => {
    const names = {
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

    return names[shortName];
  },
  generateText: (char) => {
    const runs = char.runs.dungeons;
    runs.sort((a, b) => {
      return (b.score || 0) - (a.score || 0)
    });

    let str = "Score: " + Math.round(char.info.characterDetails.mythicPlusScores.all.score);
    str += "\n\n";

    const runsText = [];
    runs.forEach((run) => {
      let text = functions.getBrName(run.dungeon.short_name) + " ";

      if (run.num_chests !== undefined) {
        if (run.num_chests === 0) {
          text += ":poop:";
        } else {
          for (let i = 0; i < run.num_chests; i++) {
            text += ":star:";
          }
        }
      }

      if (run.keystone_time_ms !== undefined) {
        text += " (" + text + ")";
      }

      runsText.push(text);
    });

    str += runsText.join("\n");

    return str;
  }
};

module.exports = functions;
