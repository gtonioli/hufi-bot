module.exports = {
  region: process.env.REGION,
  realm: process.env.REALM,
  season: process.env.SEASON,
  tier: process.env.TIER,
  guild: process.env.GUILD,
  version: require('../package.json').version
};
