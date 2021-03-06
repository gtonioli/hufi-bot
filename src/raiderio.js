import axios from 'axios';
import { guild, realm, region, season, tier } from './config';

const getCharacterDetails = async (id) => {
  return await axios
    .get('https://raider.io/api/characters/mythic-plus-scored-runs?season=' + season + '&role=all&mode=scored&affixes=all&date=all&characterId=' + id)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      throw new Error('Erro ao buscar informações =(');
    });
};

const getCharacter = async (name) => {
  return await axios
    .get('https://raider.io/api/characters/' + region + '/' + realm + '/' + encodeURIComponent(name) + '/?season=' + season + '&tier=' + tier)
    .then(async (response) => {
      const runs = await getCharacterDetails(response.data.characterDetails.character.id);

      return {
        info: response.data,
        runs: runs,
      };
    })
    .catch((err) => {
      if (err instanceof Error) {
        throw err;
      }

      throw new Error('Char não encontrado =(');
    });
};

const getRank = async () => {
  return await axios
    .get(
      'https://raider.io/api/mythic-plus/rankings/characters?region=' +
        region +
        '&realm=' +
        realm +
        '&guild=' +
        encodeURIComponent(guild) +
        '&season=' +
        season +
        '&class=all&role=all&page=0',
    )
    .then((response) => {
      return response.data.rankings.rankedCharacters;
    })
    .catch(() => {
      throw new Error('Erro ao buscar informações =(');
    });
};

module.exports = { getCharacter, getCharacterDetails, getRank };
