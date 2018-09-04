module.exports = {
  region: process.env.REGION,
  realm: process.env.REALM,
  season: process.env.SEASON,
  guild: process.env.GUILD,
  version: require('../package.json').version
};
