import axios from 'axios';
import {guild, realm, region, season} from './config';

class RaiderIO {
  static async getCharacter(name) {
    let char = {};
    await axios.get("https://raider.io/api/characters/" + region + "/" + realm + "/" + name + "/?season=" + season + "&tier=21").then(async (response) => {
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
  }

  static async getCharacterDetails(id) {
    let details = {};
    await axios.get("https://raider.io/api/characters/mythic-plus-scored-runs?season=" + season + "&role=all&mode=scored&affixes=all&date=all&characterId=" + id).then((response) => {
      details = response.data;
    }).catch(() => {
      details = {
        status: "error",
        msg: "Erro ao buscar informações =("
      };
    });

    return details;
  }

  static async getRank() {
    let rank = [];
    await axios.get("https://raider.io/api/mythic-plus/rankings/characters?region=" + region + "&realm=" + realm + "&guild=" + guild + "&season=" + season + "&class=all&role=all&page=0").then((response) => {
      rank = response.data.rankings.rankedCharacters;
    }).catch(() => {
      rank = {
        status: "error",
        msg: "Erro ao buscar informações =("
      };
    });

    return rank;
  }
}

export default RaiderIO;
