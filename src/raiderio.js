const axios = require("axios");

const RaiderIO = {
  getCharacter: async (name) => {
    let char = {};
    await axios.get("https://raider.io/api/characters/us/azralon/" + name + "/?season=season-7.3.2&tier=21").then(async (response) => {
      const runs = await RaiderIO.getCharacterDetails(response.data.characterDetails.character.id);
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
  }
};

module.exports = RaiderIO;
