const path = require('path');
const writeToDisk = require('./writeToDisk');
const teamData = require('../data/teamData');
const teamIDToName = require('../data/teamIDToData');

function writeTeamDataToDisk() {
  try {
    const res = {};

    for (let i = 0; i < teamData.length; i++) {
      const teamInfo = teamData[i].competitor;
      res[teamInfo.id] = {
        name: teamInfo.name,
        svgIcon: teamInfo.icon,
        abbName: teamInfo.abbreviatedName,
      };
    }

    writeToDisk(res, path.resolve(__dirname, '../data/teamIDToData.json'));
  } catch (err) {
    throw err;
  }
}

function getTeamNameFromID(id) {
  try {
    return teamIDToName[id].name;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  writeTeamDataToDisk,
  getTeamNameFromID,
};
