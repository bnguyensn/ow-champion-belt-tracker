#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const { getStagesData } = require('../lib/api/schedule');
const { getMatchData } = require('../lib/api/match');
const {
  getCurrentChampionIDFromStagesData,
} = require('../lib/parseScheduleData');
const { getTeamNameFromID } = require('../lib/parseTeamData');
const { getMatchDetails } = require('../lib/parseMatchData');
const writeToDisk = require('../lib/writeToDisk');

async function reportCurrentChampion() {
  try {
    const stagesData = await getStagesData();
    const {
      currentChampionIDs,
      championChangingMatchDetails,
    } = getCurrentChampionIDFromStagesData(stagesData);

    for (let i = 0; i < currentChampionIDs.length; i++) {
      const championName = getTeamNameFromID(currentChampionIDs[i]);
      console.log(
        chalk.blueBright(
          `The OVERWATCH CHAMPION at the end of stage ${i} is ${championName}`
        )
      );
    }

    return {
      latestChampionID: currentChampionIDs[currentChampionIDs.length - 1],
      championChangingMatchDetails,
    };
  } catch (err) {
    console.log(chalk.red(`Error occurred: ${err}`));
  }
}

async function run() {
  const currentChamptionReport = await reportCurrentChampion();
  writeToDisk(
    currentChamptionReport,
    path.resolve(__dirname, '../../webapp/src/data/report.json')
  );
}

run();
