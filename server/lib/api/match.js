const axios = require('axios');

const matchURLBase = 'https://api.overwatchleague.com/match/';

async function getMatchData(matchID) {
  try {
    const res = await axios.get(matchURLBase + matchID);
    return res.data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getMatchData,
};
