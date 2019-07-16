const axios = require('axios');

const scheduleURL =
  'https://api.overwatchleague.com/schedule?' +
  'expand=team.content' +
  '&locale=en_GB' +
  '&season=2019';

async function getStagesData() {
  try {
    const res = await axios.get(scheduleURL);
    return res.data.data.stages;
  } catch (err) {
    throw err
  }
}

module.exports = {
  getStagesData,
};
