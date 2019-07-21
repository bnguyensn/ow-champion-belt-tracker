#!/usr/bin/env node

/**
 * Generate a report that contains:
 * - The current champion belt holder
 * - Champion-changing match history
 * */

const path = require('path');
const { getStagesData } = require('../lib/api/schedule');
const {
  getCurrentChampionIDFromStagesData,
} = require('../lib/parseScheduleData');
const { getTeamNameFromID } = require('../lib/parseTeamData');
const writeToDisk = require('../lib/writeToDisk');

async function generateReport() {
  try {
    const stagesData = await getStagesData();
    const {
      currentChampionIDs,
      championChangingMatchDetails,
    } = getCurrentChampionIDFromStagesData(stagesData);

    for (let i = 0; i < currentChampionIDs.length; i++) {
      const championName = getTeamNameFromID(currentChampionIDs[i]);
      console.log(
        `The OVERWATCH CHAMPION at the end of stage ${i} is ${championName}`
      );
    }

    return {
      latestChampionID: currentChampionIDs[currentChampionIDs.length - 1],
      championChangingMatchDetails,
    };
  } catch (err) {
    console.error(`Error occurred: ${err}`);
  }
}

async function run() {
  const currentChamptionReport = await generateReport();
  writeToDisk(
    currentChamptionReport,
    path.resolve(__dirname, '../data/report.json')
  );
}

run();
